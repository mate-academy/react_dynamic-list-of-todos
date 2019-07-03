import React from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      <TodoList />
    </div>
  );
}

export default App;
