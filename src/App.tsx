/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
// import { get } from 'cypress/types/lodash';

import { Todo } from './types/Todo';
//import { stat } from 'fs';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [modalTodo, setModalTodo] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });

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
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
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

      {modalTodo !== null && (
        <TodoModal
          todo={todos.find(todo => todo.id === modalTodo)}
          setModalTodo={setModalTodo}
        />
      )}
    </>
  );
};
