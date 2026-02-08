/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { FilterState, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { filterTodos } from './filtersTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterValue, setFilterValue] = useState<FilterState>(FilterState.All);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const filteredTodos = filterTodos(filterValue, searchQuery, todos);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(serverTodos => setTodos(serverTodos))
      .finally(() => setLoading(false));
  }, []);

  function handleonSelectTodo(todo: Todo) {
    setSelectedTodo(todo);
  }

  function handleCloseModal() {
    setSelectedTodo(null);
  }

  function handleFilterChanged(newFilterValue: FilterState) {
    setFilterValue(newFilterValue);
  }

  function handleSearchChanged(newQuery: string) {
    setSearchQuery(newQuery);
  }

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
                onFilterChange={handleFilterChanged}
                onSearchChange={handleSearchChanged}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={handleonSelectTodo}
                  selectedTodoId={selectedTodo?.id ?? null}
                />
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
