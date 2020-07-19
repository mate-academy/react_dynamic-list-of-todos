import React, { FC, useState } from 'react';
import './App.css';
import { getTodos } from './api';
import { PreparedTodos } from './interfaces';
import { TodoList } from './TodoList';
// import { fetchedURL, URL_TODO, URL_USERS } from './api';

const App: FC = () => {
  const [todos, setTodos] = useState<PreparedTodos[]>([]);
  const [isLoading, setLoading] = useState(false);

  const prepared = async () => {
    setLoading(true);
    await getTodos().then(result => setTodos(result));
    setLoading(false);
  };

  return (
    <>
      <h1>Hello</h1>
      { !todos.length
        ? (
          <button type="button" onClick={prepared}>
            {isLoading ? 'Loading' : 'Click for download'}
          </button>
        )
        : <TodoList todos={todos} />}
    </>
  );
};

export default App;
