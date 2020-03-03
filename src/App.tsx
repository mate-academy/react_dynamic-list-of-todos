import React, { useState } from 'react';
import { getPreparedTodos } from './api/preparedTodos/getPreparedTodos';
import { TodoList } from './components/TodoList';
import './App.css';

const App: React.FC = () => {

  const [todos, setTodos] = useState<PreparedTodo[]>([]);

  const LoadAllTodos = () => {
    getPreparedTodos().then(allTodos => {
      setTodos([...todos, ...allTodos]);
    });
  };

  return (
    <div className="main">
      <button
        type="button"
        onClick={LoadAllTodos}
      >
        Load
      </button>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
