import React, { useState } from 'react';

import { getPreparedData } from './api/data';
import './App.css';
import { TodoList } from './components/TodoList';

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
          <p className="waves-effect waves-light btn-large mgb20" onClick={loadTodos}>
            load todos
          </p>
        )}
        {isLoading && <p>Loading...</p>}
      </div>
      {isLoaded && todos.length > 0 && (
        <TodoList todos={todos} />)}
    </>
  );
};

export default App;
