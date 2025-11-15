import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import TodolistScreen from './src/screens/TodolistScreen';

function App() {
    return (
        <Provider store={store}>
            <TodolistScreen />
        </Provider>
    );
}

export default App;
