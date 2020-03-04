import React, { useState } from 'react';
import './App.css';
import { getData } from './components/getData/getData';
import { TodoList } from './components/TodoList';

const App = () => {
  const [todos, setAllTodos] = useState<TodoWithUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleStart = async () => {
    setIsLoading(true);
    const dataFromServer = await getData();

    setAllTodos(dataFromServer);
    setIsLoading(false);
  };

  const handleFilterTitle = () => {
    setAllTodos([...todos]
      .sort((a, b) => a.title.localeCompare(b.title)));
  };

  const handleFilterName = () => {
    setAllTodos([...todos]
      .sort((a, b) => a.user.name.localeCompare(b.user.name)));
  };

  const handleFilterComplited = () => {
    setAllTodos([...todos]
      .sort((a, b) => +a.completed - +b.completed));
  };

  if (isLoading) {
    return (
      <div className="app">
        <p>Loading....</p>
      </div>
    );
  }

  if (!todos.length) {
    return (
      <div className="app">
        <button className="button is-info" type="button" onClick={handleStart}>Add</button>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="buttons-box">
        <button
          className="button is-info"
          type="button"
          onClick={handleFilterTitle}
        >
          Filter Title
        </button>
        <button
          className="button is-info"
          type="button"
          onClick={handleFilterName}
        >
          Filter Name
        </button>
        <button
          className="button is-info"
          type="button"
          onClick={handleFilterComplited}
        >
          Filter Complited
        </button>
      </div>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
