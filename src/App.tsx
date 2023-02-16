/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { FilterType } from './types/FilterType';

const getFilteredTodos = (todos: Todo[], type: string, query: string) => {
  let preparedTodos = [...todos];

  if (query) {
    const lowerQuery = query.toLowerCase();

    preparedTodos = preparedTodos.filter(todo => todo.title.toLowerCase().includes(lowerQuery));
  }

  preparedTodos = preparedTodos.filter(todo => {
    switch (type) {
      case FilterType.All:
        return true;
      case FilterType.Active:
        return !todo.completed;
      case FilterType.Completed:
        return todo.completed;
      default:
        throw new Error('Filter type is incorrect');
    }
  });

  return preparedTodos;
};

const debounce = (f: React.Dispatch<React.SetStateAction<string>>, delay: number) => {
  let timerId: number;

  return (...args: string[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, hasIsError] = useState(false);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoaded(true);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.warn('Error', error);
        hasIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  const filteredTodos = useMemo(() => getFilteredTodos(todos, filterType, appliedQuery),
    [todos, filterType, appliedQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilter={setFilterType}
                query={query}
                onQuery={setQuery}
                onApplyQuery={applyQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {isLoaded && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectedTodo={setSelectedTodo}
                />
              )}
              {isError && (
                <div className="notification is-danger has-text-centered">
                  <strong>An error occurred when loading todos</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
