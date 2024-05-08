/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { SortField } from './types/filter';
import { getFilterFunc } from './components/FilterFunc/FilterFunc';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortField, setSortField] = useState(SortField.All);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const onCloseModal = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(initialTodos => {
        setTodos(initialTodos);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = getFilterFunc(todos, { sortField, query });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                sortField={sortField}
                setSortField={setSortField}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onCloseModal={onCloseModal} />
      )}
    </>
  );
};
