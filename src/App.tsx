/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { getPreparedTodos } from './utils/getPreparedTodos';
import { FieldType } from './types/enum';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectFilter, setSelectFilter] = useState(FieldType.all);
  const [query, setQuery] = useState('');
  const [modalTodo, setModalTodo] = useState<Todo | null>(null);

  const visibleTodos = getPreparedTodos(todos, {
    query,
    filterField: selectFilter,
  });

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      // eslint-disable-next-line no-console
      .catch(error => console.error('fetch error', error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectFilter={selectFilter}
                query={query}
                setQuery={setQuery}
                setSelectFilter={setSelectFilter}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={visibleTodos}
                  modalTodo={modalTodo}
                  setModalTodo={setModalTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalTodo && (
        <TodoModal modalTodo={modalTodo} setModalTodo={setModalTodo} />
      )}
    </>
  );
};
