/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const [selected, setSelected] = useState<Todo | undefined>(undefined);
  const [filter, setFilter] = useState<string>('all');
  const [filterTitle, setFilterTitle] = useState('');

  useEffect(() => {
    const delayTimer = setTimeout(() => setLoading(true), 200);

    setLoading(true);

    getTodos()
      .then(response => {
        const byTitle = response.filter(todo =>
          todo.title.toLowerCase().includes(filterTitle.toLowerCase()),
        );

        if (filter === 'all') {
          setTodos(byTitle);
        } else if (filter === 'completed') {
          setTodos(byTitle.filter(todo => todo.completed));
        } else if (filter === 'active') {
          setTodos(byTitle.filter(todo => !todo.completed));
        }
      })
      .finally(() => {
        clearTimeout(delayTimer);
        setTimeout(() => setLoading(false), 500);
      });
  }, [filter, filterTitle]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setFilterTitle={setFilterTitle}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  setSelected={setSelected}
                  selected={selected}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selected && <TodoModal selected={selected} setSelected={setSelected} />}
    </>
  );
};
