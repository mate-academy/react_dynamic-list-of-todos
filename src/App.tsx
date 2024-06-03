/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getActiveTodo, getComplitedTodo, getToDos } from './utils/todos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [toDo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    let promise;

    switch (status) {
      case 'all':
        promise = getToDos();
        break;

      case 'active':
        promise = getActiveTodo();
        break;

      case 'completed':
        promise = getComplitedTodo();
        break;

      default:
        promise = getToDos();
    }

    promise
      .then(response => {
        if (query) {
          setTodos(
            response.filter(item => {
              const reg = new RegExp(query, 'i');

              return reg.test(item.title);
            }),
          );
        } else {
          setTodos(response);
        }
      })
      .finally(() => setLoading(false));
  }, [status, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={status}
                onStatusChanged={setStatus}
                onQueryChanged={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todos.length > 0 && (
                <TodoList todos={todos} item={toDo} onTodoSelected={setTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      {toDo && <TodoModal item={toDo} onClose={setTodo} />}
    </>
  );
};
