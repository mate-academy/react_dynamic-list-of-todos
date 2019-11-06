import React from 'react';
import './App.css';
import TodoLoad from './components/TodoLoad/TodoLoad';

function App() {
  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      <TodoLoad />
    </div>
  );
}

export default App;
