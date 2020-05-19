import React, { useState, useMemo } from 'react';
import './App.css';

import { getUsers, getTodos, Todo } from './helpers/api';
import TodoCard from './Components/TodoCard';
import { getVisibleTodos } from './Components/FilterButtons';

const App: React.FC = () => {
  const [sortType, setSortType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleLoadClick = async () => {
    setIsLoading(true);

    const todosFromServer = await getTodos();
    const usersFromServer = await getUsers();

    await new Promise(resolve => setTimeout(resolve, 10));

    const todosWithUsers = todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    }));

    setTodos(todosWithUsers);
  };

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, sortType);
  }, [todos, sortType]);

  return (
    <>
      <h1 className="title">Dynamic list of TODOs</h1>
      {!todos.length ? (
        <button className="btn load-btn" type="button" onClick={handleLoadClick} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      ) : (
        <>
          <button
            className="btn sort-title-btn"
            type="button"
            onClick={() => setSortType('title')}
          >
            Sort by title
          </button>
          <button
            className="btn sort-user-btn"
            type="button"
            onClick={() => setSortType('userName')}
          >
            Sort by user
          </button>
          <button
            className="btn sort-status-btn"
            type="button"
            onClick={() => setSortType('status')}
          >
            Sort by status
          </button>
          <button
            className="btn reset-btn"
            type="button"
            onClick={() => setSortType('id')}
          >
            Reset
          </button>

          <ul className="list">
            {visibleTodos.map(todo => (
              <li key={todo.id}>
                <TodoCard todo={todo} />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default App;
