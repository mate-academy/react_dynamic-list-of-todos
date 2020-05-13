import React, { FC, useState, MouseEvent } from 'react';
import { getPreparedTodos } from './api/api';
import { TodoList } from './components/TodoList/TodoList';
import { sortTodos } from './utils/utils';
import './App.css';

const App: FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadHandler = () => {
    setIsLoading(true);

    getPreparedTodos().then(todosWithUsers => {
      setTodos(todosWithUsers);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    const sortedTodos = sortTodos([...todos], event.currentTarget.name);

    setTodos(sortedTodos);
  };

  if (!todos.length) {
    return (
      <div className="button-container">
        <h1>Dynamic list of TODOs</h1>
        <button
          className="button"
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
      <div className="buttons-container">
        <button
          className="button"
          name="title"
          type="button"
          onClick={clickHandler}
        >
          Sort by title
        </button>
        <button
          className="button"
          name="name"
          type="button"
          onClick={clickHandler}
        >
          Sort by name
        </button>
        <button
          className="button"
          name="completed"
          type="button"
          onClick={clickHandler}
        >
          Sort by completed
        </button>
      </div>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
