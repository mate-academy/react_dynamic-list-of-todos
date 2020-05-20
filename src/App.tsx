import React, { useState } from 'react';
import './App.css';
import { getTodos, getUsers, Todo } from './helpers/api';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadClick = async () => {
    setIsLoading(true);

    try {
      const usersFromServer = await getUsers();
      const todosFromServer = await getTodos();

      const todosWithUsers = todosFromServer.map(todo => ({
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId),
      }));

      setTodos(todosWithUsers);
      setIsLoaded(true);
    } catch (error) {
      setErrorMessage('Loading error, please try again later.');
    }
  };

  const sortByTitle = () => {
    const sortedTodods = [...todos].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });

    setTodos(sortedTodods);
  };

  const sortByCompleted = () => {
    const sortedTodods = [...todos].filter(todo => todo.completed);

    setTodos(sortedTodods);
  };

  const sortByUserName = () => {
    const sortedTodods = [...todos].sort((a, b) => {
      return a.user && b.user
        ? a.user.name.localeCompare(b.user.name)
        : 0;
    });

    setTodos(sortedTodods);
  };

  return (
    <>
      <h1>Dynamic list of TODOs</h1>
      {!isLoaded ? (
        <>
          <button
            type="button"
            onClick={handleLoadClick}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
          <p className="error">{errorMessage}</p>
        </>
      ) : (
        <>
          <div className="buttons">
            <button type="button" onClick={sortByTitle}>Sort by title</button>
            <button type="button" onClick={sortByCompleted}>Sort completed</button>
            <button type="button" onClick={sortByUserName}>Sort by user name</button>
            <button type="button" onClick={handleLoadClick}>Reload All TODOs</button>
          </div>
          <ul className="todo__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={todo.completed ? 'completed todo__list-item' : 'todo__list-item'}
              >
                <h3 className="todo__list-title">{todo.title}</h3>
                <span className="todo__list-author">
                  {todo.user
                    ? todo.user.name
                    : 'Unknown user.'}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default App;
