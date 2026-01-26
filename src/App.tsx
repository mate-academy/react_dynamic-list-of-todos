/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { FilterState, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { filterTodos } from './filterTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [filterValue, setFilterValue] = useState<FilterState>(FilterState.All);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    getTodos().then(serverTodos => setTodos(serverTodos));
  }, []);

  function handleSelectTodo(todo: Todo) {
    setSelectedTodo(todo);
  }

  function handleCloseModal() {
    setSelectedTodo(undefined);
  }

  function handleFilterChanged(newFilterValue: FilterState) {
    setFilterValue(newFilterValue);
  }

  function handleSearchChanged(newQuery: string) {
    setSearchQuery(newQuery);
  }

  const filteredTodos: Todo[] | undefined = useMemo(
    () => filterTodos(filterValue, searchQuery, todos),
    [filterValue, searchQuery, todos],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterValue={filterValue}
                searchQuery={searchQuery}
                setFilterValue={handleFilterChanged}
                setSearchQuery={handleSearchChanged}
              />
            </div>

            <div className="block">
              {filteredTodos ? (
                <TodoList
                  todos={filteredTodos}
                  selectTodo={handleSelectTodo}
                  selectedTodoId={selectedTodo?.id}
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
