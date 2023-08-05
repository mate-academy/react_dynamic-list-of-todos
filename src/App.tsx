import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { SelectStatus } from './types/SelectStatus';

function getPreparedTodos(
  todos: Todo[], selectStatus: SelectStatus, query: string,
) {
  let preparedTodos = [...todos];

  if (selectStatus) {
    preparedTodos = preparedTodos.filter(todo => {
      switch (selectStatus) {
        case SelectStatus.ACTIVE: {
          return !todo.completed;
        }

        case SelectStatus.COMPLETED: {
          return todo.completed;
        }

        default:
          return true;
      }
    });
  }

  if (query.trim()) {
    preparedTodos = preparedTodos.filter(todo => todo.title
      .toLocaleUpperCase().includes(query.toLocaleUpperCase()));
  }

  return preparedTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectStatus, setSelectStatus]
  = useState<SelectStatus>(SelectStatus.ALL);
  const [query, setQuery] = useState('');
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setisLoading(true);
    getTodos()
      .then(setTodos)
      .catch(error => setErrorMessage(error.message))
      .finally(() => setisLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    return getPreparedTodos(todos, selectStatus, query);
  }, [todos, selectStatus, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            {isLoading && (
              <Loader />
            )}
            <div className="block">
              <TodoFilter
                setSelectStatus={setSelectStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            {!errorMessage && (
              <div className="block">
                <TodoList
                  todos={visibleTodos}
                  selectTodo={selectTodo}
                  setSelectTodo={setSelectTodo}
                />
              </div>
            )}

          </div>
        </div>
      </div>

      {selectTodo && (
        <TodoModal
          todo={selectTodo}
          setSelectTodo={setSelectTodo}
        />
      )}
    </>
  );
};
