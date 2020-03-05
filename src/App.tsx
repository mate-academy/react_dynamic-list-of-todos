import React, { FC, useState } from 'react';
import './App.css';

import { getUsers, getTodos } from './utils/api';
import { TodoList } from './components/TodoList/TodoList';

const App: FC = () => {
  const [todosWithUsers, setTodosWithUsers] = useState<TodoWithUsers[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickLoad = () => {
    setIsLoading(true);

    Promise.all([getUsers(), getTodos()])
      .then(([usersFromApi, todosFromApi]) => {
        setTodosWithUsers(todosFromApi.map(todo => ({
          ...todo,
          user: usersFromApi.find(user => user.id === todo.userId),
        })));
      })
      .finally(() => setIsLoading(false));
  };

  const handleSortName = () => {
    setTodosWithUsers([...todosWithUsers].sort((a, b) => {
      if (a.user && b.user) {
        return a.user.name.localeCompare(b.user.name);
      }

      return 0;
    }));
  };

  const handleSortTitle = () => {
    setTodosWithUsers([...todosWithUsers].sort((a, b) => {
      return a.title.localeCompare(b.title);
    }));
  };

  const handleSortReadiness = () => {
    setTodosWithUsers([...todosWithUsers].sort((a, b) => {
      return Number(a.completed) - Number(b.completed);
    }));
  };

  if (!todosWithUsers.length) {
    return (
      <div className="App">
        <h1 className="title">Dynamic list of TODOs</h1>
        <>
          <button
            type="button"
            className="button button-start"
            onClick={handleClickLoad}
            disabled={isLoading}
          >
            Load
          </button>
        </>
        {isLoading && (
          <p className="text">Loading...</p>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <h1 className="title">Dynamic list of TODOs</h1>
      <div className="buttons">
        <button
          type="button"
          className="button"
          onClick={handleSortName}
        >
          Sort by name
        </button>
        <button
          type="button"
          className="button"
          onClick={handleSortTitle}
        >
          Sort by title
        </button>
        <button
          type="button"
          className="button"
          onClick={handleSortReadiness}
        >
          Sort by readiness
        </button>
      </div>
      <TodoList todos={todosWithUsers} />

      {!todosWithUsers.length && (
        <button type="button" onClick={handleClickLoad} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load Todos'}
        </button>
      )}
    </div>
  );
};

export default App;
