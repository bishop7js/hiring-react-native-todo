import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_STORAGE_KEY = '@tasks';

// Async thunk to load tasks from AsyncStorage
export const loadTasks = createAsyncThunk(
    'tasks/loadTasks',
    async () => {
        try {
            const tasksJson = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
            return tasksJson ? JSON.parse(tasksJson) : [];
        } catch (error) {
            console.error('Error loading tasks:', error);
            return [];
        }
    }
);

// Async thunk to save tasks to AsyncStorage
export const saveTasks = createAsyncThunk(
    'tasks/saveTasks',
    async (tasks) => {
        try {
            await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
            return tasks;
        } catch (error) {
            console.error('Error saving tasks:', error);
            throw error;
        }
    }
);

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.unshift(action.payload);
            // Save to AsyncStorage after adding
            AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
        },
        toggleTask: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
                // Save to AsyncStorage after toggling
                AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
            }
        },
        editTask: (state, action) => {
            const { id, text } = action.payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                task.text = text;
                task.timestamp = 'edited just now';
                // Save to AsyncStorage after editing
                AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            // Save to AsyncStorage after deleting
            AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(loadTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addTask, toggleTask, editTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;