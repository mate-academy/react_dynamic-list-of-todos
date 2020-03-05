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

  const clickHandler = () => {
    setIsLoading(true);
    getPreparedTodos().then(todosWithUsers => {
      setTodos(todosWithUsers);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const sortHandler = (event: MouseEvent<HTMLButtonElement>) => {
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
          onClick={clickHandler}
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
          onClick={sortHandler}
        >
          Sort by title
        </button>
        <button
          name="name"
          type="button"
          onClick={sortHandler}
        >
          Sort by name
        </button>
        <button
          name="completed"
          type="button"
          onClick={sortHandler}
        >
          Sort by completed
        </button>
      </div>
      <TodoList todos={todosToSort} />
    </div>
  );
};

export default App;
