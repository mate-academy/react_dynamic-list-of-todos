/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [searchInput, setSearchInput] = React.useState('');
  const [filterType, setFilterType] = React.useState('all');
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentTodoId, setCurrentTodoId] = React.useState<number | null>(null);

  function handleSearchFilterChange(value: string) {
    setSearchInput(value);
  }

  function handleTypeFilterChange(value: string) {
    setFilterType(value);
  }

  function handleSelect(todoId: number) {
    if (currentTodoId === todoId) {
      setCurrentTodoId(null);
    } else {
      setCurrentTodoId(todoId);
    }
  }

  function handleClose() {
    setCurrentTodoId(null);
  }

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSearchInputChange={handleSearchFilterChange}
                onFilterTypeChange={handleTypeFilterChange}
                searchInput={searchInput}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={todos.filter(todo => {
                  if (
                    !todo.title
                      .toLowerCase()
                      .includes(searchInput.toLowerCase())
                  ) {
                    return false;
                  }

                  if (filterType === 'active' && todo.completed) {
                    return false;
                  }

                  if (filterType === 'completed' && !todo.completed) {
                    return false;
                  }

                  return true;
                })}
                currentTodoId={currentTodoId}
                onSelect={handleSelect}
              />
            </div>
          </div>
        </div>
      </div>

      {currentTodoId !== null && (
        <TodoModal
          todo={todos.find(todo => todo.id === currentTodoId) as Todo}
          onClose={handleClose}
        />
      )}
    </>
  );
};
