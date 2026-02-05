/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { FilterState, TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { filterTodos } from './filterTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [filterChange, onFilterChange] = useState<FilterState>(FilterState.All);
  const [searchChange, onSearchChange] = useState<string>('');

  useEffect(() => {
    getTodos().then(serverTodos => setTodos(serverTodos));
  }, []);

  function handleSelectTodo(todo: Todo) {
    setSelectedTodo(todo);
  }

  function handleCloseModal() {
    setSelectedTodo(undefined);
  }

  function handleFilterChange(newFilterValue: FilterState) {
    onFilterChange(newFilterValue);
  }

  function handleSearchChange(newQuery: string) {
    onSearchChange(newQuery);
  }

  const filteredTodos: Todo[] | undefined = useMemo(
    () => filterTodos(filterChange, searchChange, todos),
    [filterChange, searchChange, todos],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterValue={filterChange}
                searchQuery={searchChange}
                onFilterValueChange={handleFilterChange}
                onSearchQueryChange={handleSearchChange}
              />
            </div>

            <div className="block">
              {filteredTodos ? (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={handleSelectTodo}
                  selectedTodo={selectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onModalClose={handleCloseModal} />
      )}
    </>
  );
};
