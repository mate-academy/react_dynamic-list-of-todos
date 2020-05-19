import React, { useEffect, useState } from 'react';
import './App.css';

import { getUsers, getTodos, Todo } from './api/api';

const App = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sortedByTitle, setSortedByTitle] = useState(false);
  const [sortedByCompleted, setSortedByCompleted] = useState(false);
  const [sortedByUserName, setSortedByUserName] = useState(false);

  const handleLoadClick = async () => {
    setLoading(true);

    try {
      const usersFromServer = await getUsers();
      const todosFromServer = await getTodos();

      const todosWithUsers = todosFromServer.map(todo => ({
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId),
      }));

      setTodos(todosWithUsers);
      setVisibleTodos(todosWithUsers);
      setLoaded(true);
    } catch (e) {
      setErrorMessage('Loading error');
    }

    setLoading(false);
  };
  useEffect(() => {
    handleLoadClick();
  }, []);

  const sortByTitle = () => {

    const sortedTodos = [...todos].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });

    if (sortedByTitle) {
      setVisibleTodos(sortedTodos.reverse());
      setSortedByTitle(false);
    } else {
      setVisibleTodos(sortedTodos);
      setSortedByTitle(true);
    };

    setSortedByCompleted(false);
    setSortedByUserName(false);
  };

  const sortByCompleted = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      return Number(b.completed) - Number(a.completed);
    });

    if (sortedByCompleted) {
      setVisibleTodos(sortedTodos.reverse());
      setSortedByCompleted(false);
    } else {
      setVisibleTodos(sortedTodos);
      setSortedByCompleted(true);
    };

    setSortedByTitle(false);
    setSortedByUserName(false);
  };

  const sortByUserName = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      if (a.user === undefined || b.user === undefined) {
        throw new TypeError('ERROR')
      }

      return a.user.name.localeCompare(b.user.name);
    });

    if (sortedByUserName) {
      setVisibleTodos(sortedTodos.reverse());
      setSortedByUserName(false);
    } else {
      setVisibleTodos(sortedTodos);
      setSortedByUserName(true);
    };

    setSortedByTitle(false);
    setSortedByCompleted(false);
  };

  const reset = () => {
    setVisibleTodos(todos);
    setSortedByTitle(false);
    setSortedByCompleted(false);
    setSortedByUserName(false);
  };

  return (
    <div className="main">
      <h1>Dinamic list of TODOs</h1>

      <div className="buttons">
        <button type="button" className="button" onClick={reset}>Reset</button>
        <button type="button" className="button" onClick={sortByTitle}>Sort by title</button>
        <button type="button" className="button" onClick={sortByCompleted}>Sort by completed</button>
        <button type="button" className="button" onClick={sortByUserName}>Sort by user</button>
      </div>

      {!loaded ? (
        <>
          <button type="button" onClick={handleLoadClick} disabled={loading}>
            {loading ? 'Loading...' : 'Load Information'}
          </button>

          {errorMessage && (
            <p>
              {errorMessage}
            </p>
          )}
        </>
      ) : (
        todos.length > 0 ? (
          <ul className="list">
            {visibleTodos.map(todo => (
              <li key={todo.id} className={todo.completed ? "completed" : "notCompleted"}>
                <input type="checkbox" checked={todo.completed} disabled/>
                {todo.title + ' '}
                ({todo.user ? todo.user.name : 'Unknown'})
              </li>
            ))}
          </ul>
        ) : (
          <>
            <button type="button" onClick={handleLoadClick} disabled={loading}>
              {loading ? 'Loading...' : 'Reload'}
            </button>

            No todos yet
          </>
        )
      )}
    </div>
    )
};

export default App;
