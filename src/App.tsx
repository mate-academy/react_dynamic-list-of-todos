import React, { useState } from 'react';
import './App.css';

import { getUsers, getTodos, Todo } from './helpers/api';

const App = () => {
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadClick = async () => {
    setIsLoading(true);

    const todosFromServer = await getTodos();
    const usersFromServer = await getUsers();

    const todosWithUsers = todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    }));

    setInitialTodos(todosWithUsers);
    setTodos(todosWithUsers);
  };

  const reset = () => {
    setTodos(initialTodos);
  };

  const sortByTitle = () => {
    const sortedTodos = [...initialTodos].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });

    setTodos(sortedTodos);
  };

  const sortByCompleted = () => {
    const sortedTodos = [...initialTodos].sort((a, b) => {
      return Number(a.completed) - Number(b.completed);
    });

    setTodos(sortedTodos);
  };

  const sortByUserName = () => {
    const sortedTodos = [...initialTodos].sort((a, b) => {
      return (a.user && b.user)
        ? a.user.name.localeCompare(b.user.name)
        : 0;
    });

    setTodos(sortedTodos);
  };

  return (
    <div className="container">
      <h1 className="header">Dynamic list of TODOs</h1>
      {todos.length === 0 ? (
        <button className="button" type="button" onClick={handleLoadClick}>
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      ) : (
        <>
          <p>
            <button
              className="button button-sort"
              onClick={reset}
              type="button"
            >
              Reset
            </button>
            <button
              className="button button-sort"
              onClick={sortByTitle}
              type="button"
            >
              Sort by title
            </button>
            <button
              className="button button-sort"
              onClick={sortByCompleted}
              type="button"
            >
              Sort by completed
            </button>
            <button
              className="button button-sort"
              onClick={sortByUserName}
              type="button"
            >
              Sort by user name
            </button>

          </p>
          <ul className="todos">
            {todos.map(todo => (
              <li className="todo">
                <input type="checkbox" checked={todo.completed} disabled />
                {`${todo.title} `}
                <span className="user">
                  {todo.user ? todo.user.name : 'Unknown'}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}


    </div>
  );
};

export default App;
