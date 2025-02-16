/* eslint-disable max-len */
import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterOption } from './enums/filter-options';
import { getFilteredTodos } from './components/helpers/getFilteredTodos';
import { getTodosByQuery } from './components/helpers/getTodosByQuery';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterOption, setFilterOption] = useState<FilterOption>(
    FilterOption.all,
  );
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const handleFilterTodos = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterOption(event.target.value as FilterOption);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleResetSearch = () => {
    setSearchQuery('');
  };

  const handleOpenTodoInfo = (todo: Todo) => {
    setCurrentTodo(todo);
  };

  const handleCloseTodoInfo = () => {
    setCurrentTodo(null);
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    const filtered =
      filterOption !== FilterOption.all
        ? getFilteredTodos(todos, filterOption)
        : todos;

    const formattedQuery = searchQuery.trim().toLowerCase();

    return formattedQuery
      ? getTodosByQuery(filtered, formattedQuery)
      : filtered;
  }, [filterOption, searchQuery, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterOption={filterOption}
                searchQuery={searchQuery}
                onFilterTodos={handleFilterTodos}
                onSearch={handleSearch}
                onResetSearch={handleResetSearch}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onOpenTodoInfo={handleOpenTodoInfo}
                  currentTodo={currentTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal todo={currentTodo} onClose={handleCloseTodoInfo} />
      )}
    </>
  );
};
