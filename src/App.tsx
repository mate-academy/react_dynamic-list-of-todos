import React, { useState } from 'react';
import './App.css';
import { getPreparedTodos } from './api';
import { TodoList } from './components/TodoList';

const App: React.FC = () => {
  const [isLoaded, setLoad] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [todos, setTodos] = useState<PreparedTodos>([]);

  const downloadData = () => {
    setLoading(true);
    getPreparedTodos().then((todo) => {
      setTodos(todo);
      setLoad(true);
      setLoading(false);
    });
  };

  const handleSort = (sort: string) => {
    switch (sort) {
      case 'name':
        return setTodos([...todos]
          .sort((a, b) => a.users.name.localeCompare(b.users.name)));

      case 'title':
        return setTodos([...todos]
          .sort((a, b) => a.title.localeCompare(b.title)));

      case 'completed':
        return setTodos([...todos]
          .sort((a, b) => +a.completed - (+b.completed)));

      default:
        return todos;
    }
  };

  return (
    <>
      <h1 className="head">
        Dynamic list of TODOs
      </h1>
      {
        !isLoaded ? (
          <button
            type="button"
            className="button"
            onClick={downloadData}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        ) : (
          <TodoList
            todos={todos}
            handleSort={handleSort}
          />
        )
      }
    </>
  );
};

export default App;
