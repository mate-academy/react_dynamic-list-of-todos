/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(Status.all);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.warn(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    return todos
      .filter(todo => {
        switch (status) {
          case Status.completed:
            return todo.completed;

          case Status.active:
            return !todo.completed;

          default:
            return true;
        }
      })
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  }, [todos, query, status]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                status={status}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id}
                  onTodoSelected={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          close={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
