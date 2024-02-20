/* eslint-disable max-len */
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { get } from './api';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filteredTodos = todos.filter(todo => {
    const matchesFilters =
    filter === 'all' ||
    (filter === 'completed' && todo.completed) ||
    (filter === 'active' && !todo.completed);

    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    return matchesFilters && matchesQuery;
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    setLoading(true);
    setModal(false);
    get<Todo[]>('/todos')
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleFilterChange={handleFilterChange}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  modal={modal}
                  setModal={setModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
