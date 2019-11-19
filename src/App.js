import React from 'react';
import './App.css';
import TodoApp from './components/TodoApp/TodoApp';

function App() {
  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      <TodoApp />
    </div>
  );
}

export default App;
