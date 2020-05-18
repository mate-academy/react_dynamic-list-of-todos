import React, { useState } from 'react';
import './App.css';
import { TodoList } from './TodoList';
import { getPreparedTodos } from './api';

const App: React.FC = () => {
  const [todos, setTodos] = useState<PreparedTodo[]>([]);
  const [isLoaded, setLoad] = useState<boolean>(false);
  const [isloading, setLoading] = useState<boolean>(false);

  const loadedTodos = () => {
    setLoading(true);
    setTimeout(() => {
      getPreparedTodos().then((todosFromServer) => {
        setTodos(todosFromServer);
        setLoad(true);
        setLoading(false);
      });
    }, 1000);
  };

  const sortByTitle = () => {
    setTodos([...todos]
      .sort((a, b) => a.title.localeCompare(b.title)));
  };

  const sortByStatus = () => {
    setTodos([...todos]
      .sort((a, b) => +b.completed - +a.completed));
  };

  const sortByName = () => {
    return setTodos([...todos]
      .sort((a, b) => a.user.name.localeCompare(b.user.name)));
  };

  return (
    <div className="container">
      <h1>Dynamic list of TODOs</h1>
      {!isLoaded
        ? (
          <button
            type="button"
            className="button"
            onClick={loadedTodos}
          >
            {isloading ? 'Loading...' : 'Click to Load'}
          </button>
        )
        : (
          <>
            <div className="button__container">
              <button
                className="button"
                type="button"
                onClick={sortByTitle}
              >
                Sort By Title
              </button>
              <button
                className="button"
                type="button"
                onClick={sortByName}
              >
                Sort By Name
              </button>
              <button
                className="button"
                type="button"
                onClick={sortByStatus}
              >
                Sort By Status
              </button>
            </div>
            <TodoList todos={todos} />
          </>
        )}
    </div>
  );
};

export default App;
