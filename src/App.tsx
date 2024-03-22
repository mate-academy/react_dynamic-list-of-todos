/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { getPreparedTodos } from './services/getPreparedTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterField, setFilterField] = useState('all');
  const [modalTodo, setModalTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const visibleTodos = useMemo(() => {
    return getPreparedTodos(todos, filterField, query);
  }, [todos, filterField, query]);

  const listIsEmpty = todos.length === 0;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filterField={filterField}
                setFilterField={setFilterField}
              />
            </div>

            <div className="block">
              {listIsEmpty && <Loader />}
              <TodoList
                todos={visibleTodos}
                modalTodo={modalTodo}
                setModalTodo={setModalTodo}
              />
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
