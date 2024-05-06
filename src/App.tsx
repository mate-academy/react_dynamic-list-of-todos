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

const getTodosFromServer = getTodos().then(t => t);

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    if (filter === 'all') {
      getTodosFromServer
        .then(t =>
          setTodos(
            t.filter(todo =>
              todo.title.toLowerCase().includes(query.toLowerCase()),
            ),
          ),
        )
        .finally(() => setLoading(false));
    }

    if (filter === 'active') {
      getTodosFromServer
        .then(t =>
          setTodos(
            t.filter(
              todo =>
                !todo.completed &&
                todo.title.toLowerCase().includes(query.toLowerCase()),
            ),
          ),
        )
        .finally(() => setLoading(false));
    }

    if (filter === 'completed') {
      getTodosFromServer
        .then(t =>
          setTodos(
            t.filter(
              todo =>
                todo.completed &&
                todo.title.toLowerCase().includes(query.toLowerCase()),
            ),
          ),
        )
        .finally(() => setLoading(false));
    }
  }, [filter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={todos}
                  setActiveTodo={setActiveTodo}
                  activeTodo={activeTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {activeTodo && (
        <TodoModal activeTodo={activeTodo} setActiveTodo={setActiveTodo} />
      )}
    </>
  );
};
