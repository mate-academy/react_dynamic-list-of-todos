import React, { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import { getTodosFromServer, getUsersFromServer } from './api';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [loadedTodos, setLoadedTodos] = useState([]);

  const handleLoading = async() => {
    setIsLoading(true);

    const todos = await getTodosFromServer();
    const users = await getUsersFromServer();

    setIsLoading(false);
    setButtonStatus(false);

    const preparedTodos = todos.map(todo => ({
      ...todo,
      user: users.find(user => todo.userId === user.id),
    }));

    setLoadedTodos(preparedTodos);

    return preparedTodos;
  };

  const sortByTitle = () => {
    const sortedTodos = loadedTodos
      .sort((a, b) => (a.title.localeCompare(b.title)));

    setLoadedTodos([...sortedTodos]);
  };

  const sortByUser = () => {
    const sortedTodos = loadedTodos
      .sort((a, b) => (a.user.name.localeCompare(b.user.name)));

    setLoadedTodos([...sortedTodos]);
  };

  const sortByStatus = () => {
    const sortedTodos = loadedTodos
      .sort((a, b) => (b.completed - a.completed));

    setLoadedTodos([...sortedTodos]);
  };

  if (isLoading) {
    return (
      <h1 className="start-page">Loading...</h1>
    );
  }

  return buttonStatus
    ? (
      <div className="start-page">
        <button
          className="button"
          type="button"
          onClick={handleLoading}
        >
          Load goods
        </button>
      </div>
    )
    : (
      <>
        <div className="button-block">
          <button
            type="button"
            className="button"
            onClick={sortByTitle}
          >
            Sort by title
          </button>
          <button
            type="button"
            className="button"
            onClick={sortByUser}
          >
            Sort by user
          </button>
          <button
            type="button"
            className="button"
            onClick={sortByStatus}
          >
            Sort by status
          </button>
        </div>
        <div className="App">
          <TodoList todos={loadedTodos} />
        </div>
      </>
    );
}

export default App;
