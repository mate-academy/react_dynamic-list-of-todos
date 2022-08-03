import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState<number | null>(8);
  const [query, setQuery] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  const loadTodos = useCallback(
    async () => {
      const loadedTodos = await getTodos();

      setTodos(loadedTodos);
    },
    [],
  );

  useEffect(() => {
    loadTodos();
  }, []);

  const queryChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const visibleTodos = todos.filter(
    todo => todo.title.toUpperCase().includes(query.toUpperCase()),
  ).filter(todo => {
    if (filter === 'all') {
      return true;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return !todo.completed;
  });

  const randomizeHandler = () => {
    setTodos(prevTodos => [...prevTodos].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <div className="field has-addons mt-2">
          <div className="control">
            <input
              data-cy="filterByTitle"
              type="text"
              id="search-query"
              className="input is-link is-medium is-rounded"
              placeholder="Type search word"
              onChange={queryChangeHandler}
            />
          </div>
        </div>
        <div className="select is-rounded is-success is-light is-outlined">
          <select
            value={filter}
            onChange={handleFilter}
          >
            <option key="all" value="all">ALL</option>
            <option key="active" value="active">Active</option>
            <option key="completed" value="completed">Completed</option>
          </select>
        </div>
        <button
          className="button is-success is-rounded"
          type="button"
          onClick={randomizeHandler}
        >
          Randomize
        </button>
        <TodoList
          todos={visibleTodos}
          setUser={setSelectedUserId}
          selectedUserId={selectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clearUser={setSelectedUserId}
            />
          ) : <h2>No user selected</h2>}
        </div>
      </div>
    </div>
  );
};

export default App;
