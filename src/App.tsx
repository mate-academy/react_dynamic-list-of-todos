/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [load, setLoad] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(Status.all);

  useEffect(() => {
    setLoad(true);

    getTodos()
      .then(setTodos)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.warn(error);
      })
      .finally(() => setLoad(false));
  }, []);

  const filteredTodos = useMemo(() => {
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
      .filter(todo =>
        todo.title.toLowerCase().trim().includes(query.trim().toLowerCase()),
      );
  }, [query, todos, status]);

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
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {load ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id}
                  onTodoSelected={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} close={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
