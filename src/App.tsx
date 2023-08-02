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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  const [clickedUser, setClickedUser] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => new Error('Try again later'))
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    const filterTodos = todos.filter(todo => {
      const preperedTodo = todo.title.toLowerCase();
      const preperedQuery = query.toLowerCase();

      return preperedTodo.includes(preperedQuery);
    });

    switch (status) {
      case 'all':
        return filterTodos;
      case 'active':
        return filterTodos.filter(todo => todo.completed === false);
      case 'completed':
        return filterTodos.filter(todo => todo.completed === true);
      default:
        return filterTodos;
    }
  }, [todos, query, status]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                query={query}
                setStatus={setStatus}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  setClickedUser={setClickedUser}
                  clickedUser={clickedUser}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {clickedUser && (
        <TodoModal
          clickedUser={clickedUser}
          setClickedUser={setClickedUser}
        />
      )}
    </>
  );
};
