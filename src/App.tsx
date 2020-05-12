import React, { useState } from 'react';

import './App.css';
import { getPreparedData } from './api/data';
import { TodoList } from './components/TodoList';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  const loadTodos = () => {
    setLoading(true);

    getPreparedData()
      .then(data => setTodos(data));

    setLoading(false);
    setLoaded(true);
  };

  return (
    <>
      <div className="heading">
        <h1>Dynamic list of TODOs</h1>
        {!isLoading && !isLoaded
        && (
          <button
            type="button"
            className="waves-effect waves-light btn-large mgb20"
            onClick={loadTodos}
          >
            load todos
          </button>
        )}
        {isLoading && <Loader />}
      </div>
      {isLoaded && todos.length > 0 && (
        <TodoList todos={todos} />)}
    </>
  );
};

export default App;
