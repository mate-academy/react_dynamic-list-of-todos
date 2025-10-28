/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isTodosLoading, setIsTodosLoading] = useState<boolean>(true);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<FilterStatus>(
    FilterStatus.All,
  );

  useEffect(() => {
    getTodos()
      .then(todosData => {
        setTodos(todosData);
      })
      .finally(() => {
        setIsTodosLoading(false);
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    const isStatusMatch =
      selectedFilter === FilterStatus.All ||
      (selectedFilter === FilterStatus.Completed
        ? todo.completed
        : !todo.completed);

    const isSearchMatch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return isStatusMatch && isSearchMatch;
  });

  const handleFilterSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value as FilterStatus);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);

    setUser(null);
    setIsUserLoading(true);

    getUser(todo.userId)
      .then(userData => {
        setUser(userData);
      })
      .catch(error => {
        console.error('Error loading user:', error); // eslint-disable-line no-console
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
    setUser(null);
  };

  const handleHideTodo = () => {
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
                searchQuery={searchQuery}
                onSearchChange={handleQueryChange}
                selectedFilter={selectedFilter}
                onFilterChange={handleFilterSelect}
              />
            </div>

            <div className="block">
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onTodoSelect={handleTodoSelect}
                  onHideTodo={handleHideTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={handleModalClose}
          user={user}
          isLoading={isUserLoading}
        />
      )}
    </>
  );
};
