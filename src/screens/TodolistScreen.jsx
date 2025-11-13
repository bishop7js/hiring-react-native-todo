import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    Modal,
    StatusBar,
} from "react-native";

const TodolistScreen = () => {
    const [tasks, setTasks] = useState([
        {
            id: "1",
            text: "Layout about page",
            timestamp: "about 1 hour ago",
            completed: false,
        },
        {
            id: "2",
            text: "Color",
            timestamp: "1 day ago",
            completed: false,
        },
        {
            id: "3",
            text: "typo graphys",
            timestamp: "3 days ago",
            completed: false,
        },
        {
            id: "4",
            text: "6 starter",
            timestamp: "6 days ago",
            completed: false,
        },
        {
            id: "5",
            text: "meditate",
            timestamp: "2 weeks ago",
            completed: true,
        },
        {
            id: "6",
            text: "meditate",
            timestamp: "2 weeks ago",
            completed: true,
        },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [newTaskText, setNewTaskText] = useState("");

    const toggleTask = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const addTask = () => {
        if (newTaskText.trim()) {
            const newTask = {
                id: Date.now().toString(),
                text: newTaskText.trim(),
                timestamp: "just now",
                completed: false,
            };
            setTasks((prevTasks) => [newTask, ...prevTasks]);
            setNewTaskText("");
            setModalVisible(false);
        }
    };

    const renderTask = ({ item }) => (
        <TouchableOpacity
            style={styles.taskItem}
            onPress={() => toggleTask(item.id)}
            activeOpacity={0.7}
        >
            <View
                style={[
                    styles.checkbox,
                    item.completed && styles.checkboxCompleted,
                ]}
            >
                {item.completed && (
                    <Text style={styles.checkmark}>✓</Text>
                )}
            </View>
            <View style={styles.taskContent}>
                <Text
                    style={[
                        styles.taskText,
                        item.completed && styles.taskTextCompleted,
                    ]}
                >
                    {item.text}
                </Text>
                <Text
                    style={[
                        styles.timestamp,
                        item.completed && styles.timestampCompleted,
                    ]}
                >
                    {item.timestamp}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const renderSeparator = () => <View style={styles.separator} />;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tasks</Text>
            </View>

            {/* Task List */}
            <FlatList
                data={tasks}
                renderItem={renderTask}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={renderSeparator}
                contentContainerStyle={styles.listContent}
            />

            {/* Add Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.8}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

            {/* Add Task Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>New Task</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter task description"
                            value={newTaskText}
                            onChangeText={setNewTaskText}
                            autoFocus
                            multiline
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => {
                                    setModalVisible(false);
                                    setNewTaskText("");
                                }}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.addTaskButton]}
                                onPress={addTask}
                            >
                                <Text style={styles.addTaskButtonText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingTop: 50,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#111111",
    },
    listContent: {
        paddingHorizontal: 24,
    },
    taskItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 20,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#111111",
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
        marginTop: 2,
    },
    checkboxCompleted: {
        backgroundColor: "#51ACB4",
        borderColor: "#51ACB4",
    },
    checkmark: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    taskContent: {
        flex: 1,
    },
    taskText: {
        fontSize: 17,
        color: "#111111",
        marginBottom: 4,
    },
    taskTextCompleted: {
        color: "#555555",
    },
    timestamp: {
        fontSize: 14,
        color: "#555555",
    },
    timestampCompleted: {
        color: "#999999",
    },
    separator: {
        height: 1,
        backgroundColor: "#555555",
        opacity: 0.35,
    },
    addButton: {
        position: "absolute",
        right: 24,
        bottom: 40,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#51ACB4",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    addButtonText: {
        fontSize: 32,
        color: "#FFFFFF",
        fontWeight: "300",
        marginTop: -2,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 24,
        width: "85%",
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#111111",
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#DDDDDD",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        minHeight: 80,
        textAlignVertical: "top",
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#F0F0F0",
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111111",
    },
    addTaskButton: {
        backgroundColor: "#51ACB4",
    },
    addTaskButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FFFFFF",
    },
});

export default TodolistScreen;