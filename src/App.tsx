import React, { FC } from 'react';
import './App.css';
import { TodoApp } from './components/TodoApp';

const App: FC = () => (
  <div className="container">
    <h1>Dynamic list of TODOs</h1>
    <TodoApp />
  </div>
);

export default App;
