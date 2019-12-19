import React, { useState } from 'react';
import './App.css';
import { loadDataFromServer } from './todosApi';
import { TODOS_URL, USERS_URL } from './const';

import TodoList from './TodoList';

const App = () => {
  const [isStarted, setStart] = useState(false);
  const [todosWithUsers, setTodosWithUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSortField, setSortField] = useState(null);

  const getTodosWithUsers = (todosList, usersList) => todosList.map(
    todo => ({
      ...todo,
      user: usersList.find(user => user.id === todo.userId).name,
    })
  );

  const start = async() => {
    setStart(true);
    setIsLoading(true);

    try {
      const todos = await loadDataFromServer(TODOS_URL);
      const users = await loadDataFromServer(USERS_URL);

      setIsLoading(false);
      setError('');
      setTodosWithUsers(getTodosWithUsers(todos, users));
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };

  const sortByField = (field, type) => {
    const todosCopy = [...todosWithUsers];

    if (currentSortField === field) {
      setTodosWithUsers(todosCopy.reverse());

      return;
    }

    switch (type) {
      case 'string':
        todosCopy.sort(
          (a, b) => a[field].localeCompare(b[field])
        );
        break;

      case 'number':
        todosCopy.sort(
          (a, b) => a[field] - b[field]
        );
        break;

      case 'boolean':
        todosCopy.sort(
          (a, b) => a[field].toString().localeCompare(b[field].toString())
        );
        break;

      default:
        todosCopy.sort();
    }

    setTodosWithUsers(todosCopy);
    setSortField(field);
  };

  if (isLoading) {
    return (
      <div className="App">
        <h2>
          LOADING...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div style={{ color: 'red' }}>
          {error}
        </div>
        <button
          type="button"
          onClick={start}
        >
        Try again
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      {isStarted ? (
        <>
          <h1>Dynamic list of todos</h1>
          <TodoList
            todosWithUsers={todosWithUsers}
            sortByField={sortByField}
          />
        </>
      ) : (
        <button
          type="button"
          onClick={start}
        >
          Start
        </button>
      )}
    </div>
  );
};

export default App;
