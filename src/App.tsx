/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Select } from './types/Select';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(Select.All);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('There are no todos'))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = (todosToFilter: Todo[], filterStatus: Select, searchValue: string): Todo[] => {
    if (filterStatus === Select.All && !searchValue.trim()) {
      return todosToFilter;
    }

    return todosToFilter.filter(currentTodo => {
      if (filterStatus === Select.Active && currentTodo.completed) {
        return false;
      }

      if (filterStatus === Select.Completed && !currentTodo.completed) {
        return false;
      }

      if (searchValue.trim()
        && !currentTodo.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return false;
      }

      return true;
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
                  todos={visibleTodos}
                  setSelectedTodo={setSelectTodo}
                  selectedTodo={selectTodo}
                />
              ) : (
                <p>{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectTodo && <TodoModal closeModal={() => setSelectTodo(null)} todo={selectTodo} />}
    </>
  );
};
