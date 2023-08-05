/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

import { Todo } from './types/Todo';
import { Status } from './types/Status';

function getFilteredTodos(
  todos: Todo[],
  query: string,
  status: Status,
) {
  let visibleTodos = [...todos];

  if (query) {
    visibleTodos = visibleTodos.filter(
      todo => todo.title.toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()),
    );
  }

  return visibleTodos
    .filter(todo => {
      switch (status) {
        case Status.COMPLETED:
          return todo.completed;

        case Status.ACTIVE:
          return !todo.completed;

        default:
          return true;
      }
    });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(Status.ALL);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => {
        throw new Error('Please try later');
      })
      .finally(() => setLoading(false));
  }, []);

  // const getFilteredTodos = () => {
  //   const filteredTodos = todos.filter(
  //     todo => todo.title.toLocaleLowerCase()
  //       .includes(query.trim().toLocaleLowerCase()),
  //   );

  //   switch (status) {
  //     case Status.ACTIVE:
  //       return todos.filter(todo => !todo.completed);

  //     case Status.COMPLETED:
  //       return todos.filter(todo => todo.completed);

  //     case Status.ALL:
  //     default:
  //       return todos;
  //   }
  // };

  // const filteredTodos = getFilteredTodos();
  // const isTodos = filteredTodos.length > 0;
  const visibleTodos = useMemo(
    () => getFilteredTodos(todos, query, status), [todos, query, status],
  );

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
                onChangeQuery={setQuery}
                onSelectedStatus={setStatus}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  onSelecterTodos={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id}
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
