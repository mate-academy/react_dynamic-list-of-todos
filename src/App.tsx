/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTodo, setActiveTodo] = useState<Todo>();
  const [filter, setFilter] = useState('all');
  const [textFilter, setTextFilter] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodosFromServer)
      .catch(() => {
        setTodosFromServer([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return todosFromServer
      .filter(todo => {
        return filter === 'all'
          ? true
          : filter === 'completed'
            ? todo.completed
            : !todo.completed;
      })
      .filter(todo =>
        textFilter
          ? todo.title.toLowerCase().includes(textFilter.toLowerCase())
          : todo,
      );
  }, [filter, todosFromServer, textFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={value => setFilter(value)}
                onQueryChange={query => {
                  setTextFilter(query);
                }}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && filteredTodos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  onFilterChange={todo => setActiveTodo(todo)}
                  activeTodo={activeTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal todo={activeTodo} onClose={() => setActiveTodo(undefined)} />
      )}
    </>
  );
};
