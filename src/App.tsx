import React, { useState } from 'react';
import './App.css';
import { getData } from './components/getData/getData';
import { TodoList } from './components/TodoList';

const App = () => {
  const [allTodos, setAllTodos] = useState<TodoWithUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleStart = async () => {
    setIsLoading(true);
    const dataFromServer = await getData();

    setAllTodos(dataFromServer);
    setIsLoading(false);
  };

  const handleFilterTitle = () => {
    setAllTodos([...allTodos]
      .sort((a, b) => a.title.localeCompare(b.title)));
  };

  const handleFilterName = () => {
    setAllTodos([...allTodos]
      .sort((a, b) => a.user.name.localeCompare(b.user.name)));
  };

  const handleFilterComplited = () => {
    setAllTodos([...allTodos]
      .sort((a, b) => +a.completed - +b.completed));
  };

  if (isLoading) {
    return (
      <div className="app">
        <p>Loading....</p>
      </div>
    );
  }

  if (!allTodos.length) {
    return (
      <div className="app">
        <button type="button" onClick={handleStart}>Add</button>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Dynamic list of TODOs</h1>

      <button type="button" onClick={handleFilterTitle}>Filter Title</button>
      <button type="button" onClick={handleFilterName}>Filter Name</button>
      <button type="button" onClick={handleFilterComplited}>Filter Complited</button>
      <TodoList allTodos={allTodos} />
    </div>
  );
};

export default App;
