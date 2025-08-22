/* eslint-disable max-len */
import React, { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filters, prepareTodos } from './utils/todos';
import { useFetch } from './hooks/useFetch';

export const App: React.FC = () => {
  const [filter, setFilter] = useState<Filters>(Filters.All);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, isLoading, errorMessage] = useFetch<Todo[]>(getTodos);

  const filteredTodos = useMemo(() => {
    return todos ? prepareTodos(todos, filter, searchText) : todos;
  }, [todos, filter, searchText]);

  const handleChangeFilter = (value: Filters) => {
    setFilter(value);
  };

  const handleSearchTextChange = (value: string) => {
    setSearchText(value);
  };

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleChangeFilter={handleChangeFilter}
                filter={filter}
                onChange={handleSearchTextChange}
                searchText={searchText}
              />
            </div>

            <div className="block">
              {errorMessage && <p className="has-danger">{errorMessage}</p>}
              {isLoading && <Loader />}
              {!isLoading && filteredTodos && (
                <TodoList
                  todos={filteredTodos}
                  selectTodo={handleSelectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} closeModal={closeModal} />
      )}
    </>
  );
};
