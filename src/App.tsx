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

const todosFromServer = getTodos().then(todo => todo);

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    if (filter === 'all') {
      todosFromServer
        .then(todoes =>
          setTodos(
            todoes.filter(todo =>
              todo.title
                .toLocaleLowerCase()
                .includes(query.toLocaleLowerCase()),
            ),
          ),
        )
        .finally(() => setLoading(false));
    }

    if (filter === 'active') {
      todosFromServer
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
      todosFromServer
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
                query={query}
                setQuery={setQuery}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  activeTodo={activeTodo}
                  setActiveTodo={setActiveTodo}
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
