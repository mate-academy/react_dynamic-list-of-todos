import React, { useState } from 'react';
import './App.css';

import { getUsers, getTodos, Todo } from './component/api';

const App = () => {
  const [sortType, setSortType] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reversed, setReversed] = useState(false);

  const handleLoadClick = async () => {
    setLoading(true);

    try {
      const todosFromServer = await getTodos();
      const usersFromServer = await getUsers();

      const todosWithUsers: Todo[] = todosFromServer.map((todo: Todo) => ({
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId),
      }));

      setTodos(todosWithUsers);
    } catch (e) {
      setError(`Loading error: ${e}`);
    }

    setLoading(false);
  };

  const getVisibleTodos = () => {
    switch (sortType) {
      case 'title':
        return [...todos].sort((a, b) => a.title.localeCompare(b.title));
      case 'completed':
        return [...todos].sort((a, b) => +a.completed - +b.completed);
      case 'user':
        return [...todos].sort((a, b) => {
          return (a.user && b.user) ? a.user.name.localeCompare(b.user.name) : 0;
        });

      default: return todos;
    }
  };

  const visibleTodos = getVisibleTodos();

  if (reversed) {
    visibleTodos.reverse();
  }

  return (
    <div>
      <h1>Dynamic list of TODOs</h1>

      {!todos.length ? (
        <>
          <button type="button" onClick={handleLoadClick} disabled={loading}>
            {loading ? 'Loading...' : 'Load'}
          </button>

          {error && (
            <>
              <span>{error}</span>
              <button type="button" onClick={handleLoadClick} disabled={loading}>
                try again
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <button type="button" onClick={() => setReversed(!reversed)}>Reverse</button>
          <button type="button" onClick={() => setSortType('title')}>Sort by title</button>
          <button type="button" onClick={() => setSortType('completed')}>Sort by completed</button>
          <button type="button" onClick={() => setSortType('user')}>Sort by user</button>
          <button type="button" onClick={() => setSortType('')}>Reset</button>

          <ul>
            {visibleTodos.map(todo => (
              <li key={todo.id}>
                <input type="checkbox" checked={todo.completed} disabled />
                {`${todo.title} `}
                (
                {todo.user ? todo.user.name : 'Unknown'}
                )
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
