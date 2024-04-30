/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState<Todo | undefined>(undefined);
  const [filterTodos, setFilterTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => {
        setTodos(data);
        setFilterTodos(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} setFilterTodos={setFilterTodos} />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList todos={filterTodos} setItem={setItem} item={item} />
              )}
            </div>
          </div>
        </div>
      </div>

      {item && <TodoModal item={item} setItem={setItem} />}
    </>
  );
};
