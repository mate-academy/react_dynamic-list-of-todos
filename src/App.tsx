import React, { useState } from 'react';

import './App.css';
import { getTodos } from './api';
import { TodosList } from './TodosList';

const App: React.FC = () => {
  const [todos, setTodos] = useState<GetTodos>([]);
  const [isDownoaded, setDownload] = useState<boolean>(false);
  const [loading, isLoading] = useState<boolean>(false);

  const downloadData = () => {
    isLoading(true);
    getTodos().then((data) => {
      setTodos(data);
      isLoading(false);
      setDownload(true);
    });
  };

  const sortTodoByTytle = () => {
    setTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
  };

  const sortTodoByStatus = () => {
    setTodos([...todos].sort((a, b) => +a.completed - +b.completed));
  };

  const sortTodoByName = () => {
    setTodos([...todos].sort((a, b) => a.user.name.localeCompare(b.user.name)));
  };

  return (
    <section className="wrapper">
      <h1 className="todo__head">Dynamic list of TODOs</h1>
      {!isDownoaded && (
        <button type="button" className="button" onClick={downloadData}>
          {loading ? 'Loading...' : 'Load'}
        </button>
      )}
      <button type="button" onClick={sortTodoByTytle} className="button">Sort by title</button>
      <button type="button" onClick={sortTodoByStatus} className="button">Sort by status</button>
      <button type="button" onClick={sortTodoByName} className="button">Sort by name</button>
      <TodosList todos={todos} />
    </section>
  );
};

export default App;
