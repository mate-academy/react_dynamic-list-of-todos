import React, { FC, useState } from 'react';
import './App.css';

import { TodoList } from './components/TodoList/TodoList';
import { getPreparedTodos } from './api';

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleStart = async () => {
    setIsLoaded(true);

    await getPreparedTodos().then(data => setTodos(data));
  };

  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      <p>
        <span>Todos: </span>
        {todos.length}
      </p>

      { todos.length === 0
        ? (
          <button
            type="button"
            disabled={isLoaded}
            onClick={handleStart}
          >
            {!isLoaded ? 'Start' : 'Loading...'}
          </button>
        )
        : <TodoList todos={todos} />}
    </div>
  );
};

export default App;
