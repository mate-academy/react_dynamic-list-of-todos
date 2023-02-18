/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { getVisibleTodos } from './helper';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);
  const [selectedTodoId, setSelectedTodoID] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(FilterType.ALL);
  const [query, setQuery] = useState('');

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId) || null;

  const getTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsTodosLoaded(true);
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const visibleTodos = useMemo(() => getVisibleTodos(todos, selectedFilter, query), [todos, selectedFilter, query]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value as FilterType);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setQuery('');
  };

  const handleSelect = (todoId: number, userId: number) => {
    setSelectedTodoID(todoId);
    setSelectedUserId(userId);
  };

  const handleCloseButton = () => {
    setSelectedTodoID(0);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                selectedFilter={selectedFilter}
                handleFilterChange={handleFilterChange}
                handleClearSearch={handleClearSearch}
                handleInput={handleInput}
              />
            </div>

            {hasError && (
              <p>Cant Load Todos. Try again later, please</p>
            )}

            <div className="block">
              {!isTodosLoaded && <Loader />}

              {!!todos.length && (
                <TodoList
                  todos={visibleTodos}
                  todoId={selectedTodoId}
                  handleSelect={handleSelect}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          handleCloseButton={handleCloseButton}
          selectedUserId={selectedUserId}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
