import React, { useState } from 'react';
import './App.css';
import { getPreparedTodos } from './api';
import { TodoList } from './components/TodoList/TodoList';

export const App: React.FC = () => {
  const [isLoaded, setLoad] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<PreparedTodos[]>([]);

  const handleLoad = () => {
    setLoading(true);
    getPreparedTodos().then(newTodos => {
      setTodos(newTodos);
      setLoad(true);
      setLoading(false);
    });
  };

  const sortByTitle = () => {
    setTodos([...todos].sort((todoA, todoB) => todoA.title.localeCompare(todoB.title)));
  };

  const sortByName = () => {
    setTodos([...todos]
      .sort((todoA, todoB) => todoA.user.username
        .localeCompare(todoB.user.username)));
  };

  const sortByCompleted = () => {
    setTodos([...todos].sort((todoA, todoB) => Number(todoB.completed) - Number(todoA.completed)));
  };

  return (
    <div className="App">
      {isLoaded
        ? (
          <TodoList
            todos={todos}
            onTitleBtn={sortByTitle}
            onNameBtn={sortByName}
            onCompletedBtn={sortByCompleted}
          />
        )
        : (
          <div className="primary-show">
            <h1>TODOs</h1>
            <button
              className="btn btn-warning btn-lg"
              type="button"
              onClick={handleLoad}
            >
              {!isLoading ? <span>Load</span> : <span>Loading...</span>}
            </button>
          </div>
        )}
    </div>
  );
};

export default App;
