/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setLoading(true), 200);

    getTodos()
      .then(data => {
        setFilteredTodos(data);
        setTodos(data);
      })
      .finally(() => {
        clearTimeout(delayTimer);
        setTimeout(() => setLoading(false), 400);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilter={setFilteredTodos} todos={todos} />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList todos={filteredTodos} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
