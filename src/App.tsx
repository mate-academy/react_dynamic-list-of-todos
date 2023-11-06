/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { StatusSelect } from './types/StatusSelect';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [statusSelect, setStatusSelect] = useState<string>(StatusSelect.All);
  const [isLoader, setIsLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoader(true);
    getTodos()
      .then((data) => setTodos(data))
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setIsLoader(false));
  }, []);

  function filterTodos() {
    const searchFilterTodos = todos.filter((todo) => {
      const queryNormalize = query.toLowerCase();

      return todo.title.toLowerCase().includes(queryNormalize);
    });

    return searchFilterTodos.filter((todo) => {
      switch (statusSelect) {
        case StatusSelect.All:
          return todo;
        case StatusSelect.Active:
          return todo.completed === false;
        case StatusSelect.Completed:
          return todo.completed === true;
        default:
          return todo;
      }
    });
  }

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
                setStatusSelect={setStatusSelect}
              />
            </div>

            <div className="block">
              {isLoader && <Loader />}

              {todos.length > 0 && (
                <TodoList
                  todos={filterTodos()}
                  currentTodo={currentTodo}
                  setCurrentTodo={setCurrentTodo}
                />
              )}

              {errorMessage && <p>{errorMessage}</p>}

            </div>
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal
          setCurrentTodo={setCurrentTodo}
          currentTodo={currentTodo}
        />
      )}
    </>
  );
};
