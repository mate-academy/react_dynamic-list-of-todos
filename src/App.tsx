import React, { useState, MouseEvent } from 'react';
import { getPreparedTodos } from './api/api';
import { TodoList } from './components/TodoList/TodoList';
import { sortTodos } from './utils/utils';
import './App.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('');
  const todosToSort = [...todos];

  const loadHandler = () => {
    setIsLoading(true);
    getPreparedTodos().then(todosWithUsers => {
      setTodos(todosWithUsers);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const sortByHandler = (event: MouseEvent<HTMLButtonElement>) => {
    setSortBy(event.currentTarget.name);
  };

  sortTodos(todosToSort, sortBy);

  if (!todos.length) {
    return (
      <div className="button-container">
        <h1>Dynamic list of TODOs</h1>
        <button
          type="button"
          disabled={isLoading}
          onClick={loadHandler}
        >
          {isLoading ? 'Loading...' : 'Load Todos'}
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Dynamic list of TODOs</h1>
      <p>
        <span>Todos: </span>
        {todos.length}
      </p>
      <div className="button-container">
        <button
          name="title"
          type="button"
          onClick={sortByHandler}
        >
          Sort by title
        </button>
        <button
          name="name"
          type="button"
          onClick={sortByHandler}
        >
          Sort by name
        </button>
        <button
          name="completed"
          type="button"
          onClick={sortByHandler}
        >
          Sort by completed
        </button>
      </div>
      <TodoList todos={todosToSort} />
    </div>
  );
};

export default App;
