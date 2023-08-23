/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
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
  const [isLoading, setIsLoding] = useState(false);
  const [todo, setTodo] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState(Status.ALL);
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoding(true);
    getTodos()
      .then(setTodo)
      .catch(() => setErrorMessage('There are no todos'))
      .finally(() => setIsLoding(false));
  }, []);

  const filteredTodo = todo.filter(currentTodo => {
    switch (filter) {
      case Status.ACTIVE:
        return !currentTodo.completed;

      case Status.COMPLETED:
        return currentTodo.completed;

      default:
        return true;
    }
  });

  const visibleTodo = useMemo(() => {
    if (query.trim()) {
      return filteredTodo
        .filter(currentTodo => currentTodo.title.toLowerCase()
          .includes(query.toLowerCase()));
    }

    return filteredTodo;
  }, [todo, filter, query]);

  return (
    <div className="App">
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">
              Todos:
            </h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}

              {todo.length > 0 ? (
                <TodoList
                  todo={visibleTodo}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              ) : (
                <p>
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          close={() => setSelectedTodo(null)}
        />
      )}
    </div>
  );
};
