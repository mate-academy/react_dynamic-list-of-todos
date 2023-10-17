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
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState(Status.all);
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('There are no todos'))
      .finally(() => setIsLoading(false));
  }, []);

  const filterTodos = (todosToFilter: Todo[], status: Status, searchTerm: string): Todo[] => {
    if (status === Status.all && !searchTerm.trim()) {
      return todosToFilter;
    }

    return todosToFilter.filter(currentTodo => {
      if (status === Status.active && currentTodo.completed) {
        return false;
      }

      if (status === Status.completed && !currentTodo.completed) {
        return false;
      }

      if (searchTerm.trim()
        && !currentTodo.title.toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  };

  const visibleTodos = useMemo(() => {
    return filterTodos(todos, filter, query);
  }, [todos, filter, query]);

  return (
    <div className="App">
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

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          close={() => setSelectedTodo(null)}
        />
      )}
    </div>
  );
};
