/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(Status.all);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('There are no todos'))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = (todosToFilter: Todo[], filterStatus: Status, searchSymbols: string): Todo[] => {
    if (filterStatus === Status.all && !searchSymbols.trim()) {
      return todosToFilter;
    }

    return todosToFilter.filter(currentTodo => {
      if (searchSymbols.trim()
        && !currentTodo.title.toLowerCase()
          .includes(searchSymbols.toLowerCase())
      ) {
        return false;
      }

      switch (filterStatus) {
        case Status.active:
          return !currentTodo.completed;

        case Status.completed:
          return currentTodo.completed;
        default:
          return currentTodo;
      }
    });
  };

  const visibleTodos = useMemo(() => {
    return filteredTodos(todos, filter, query);
  }, [todos, filter, query]);

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
              {isLoading && <Loader />}
              {todos.length > 0 ? (
                <TodoList
                  todo={visibleTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              ) : (
                <p>{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal handleCloseModal={() => setSelectedTodo(null)} selectedTodo={selectedTodo} />}
    </>
  );
};
