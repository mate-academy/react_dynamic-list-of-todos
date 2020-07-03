import React from 'react';
import './App.css';
import { TodoApp } from './components/TodoApp';

const App: React.FC = () => (
  <div className="container">
    <h1>Dynamic list of TODOs</h1>
    <TodoApp />
  </div>
);

export default App;
