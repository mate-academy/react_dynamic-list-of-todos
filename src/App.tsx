/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilteredStatus } from './types/FilteredStatus';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState(FilteredStatus.All);
  const [hasQuery, setHasQuery] = useState('');
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleClear = () => {
    setHasQuery('');
    setSelectedTodo(null);
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(hasQuery.toLowerCase()),
  );

  const getFilteringTodos = filteredTodos.filter(todo => {
    switch (filter) {
      case FilteredStatus.All:
        return true;

      case FilteredStatus.Active:
        return todo.completed === false;

      case FilteredStatus.Completed:
        return todo.completed === true;

      default:
        return true;
    }
  });

  useEffect(() => {
    setIsLoadingTodos(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoadingTodos(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQueryChange={setHasQuery}
                onClear={handleClear}
                hasQuery={hasQuery}
                onStatusChange={handleStatusChange}
                hasStatus={filter}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={getFilteringTodos}
                  handleShowTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal onClear={handleClear} todo={selectedTodo} />}
    </>
  );
};
