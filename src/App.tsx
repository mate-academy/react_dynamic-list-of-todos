/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';

type SortBy = 'all' | 'completed' | 'active';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(setErrorMessage)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      setLoadingData(true);
      getUser(selectedTodo.userId)
        .then(setUser)
        .catch(setErrorMessage)
        .finally(() => setLoadingData(false));
    }
  }, [selectedTodo]);

  const handleOpenModal = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setUser(null);
  };

  const visibleTodos = todos.filter(todo => {
    const hasStatus =
      (sortBy === 'completed' && todo.completed) ||
      (sortBy === 'active' && !todo.completed) ||
      sortBy === 'all';

    const hasMatchingSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return hasStatus && hasMatchingSearch;
  });

  const handleSearch = () => {
    setSearchQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSortBy={setSortBy}
                sortBy={sortBy}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                handleSearch={handleSearch}
              />
            </div>

            <div className="block">
              {errorMessage ? (
                <p>{errorMessage}</p>
              ) : isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  handleOpenModal={handleOpenModal}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          handleCloseModal={handleCloseModal}
          selectedTodo={selectedTodo}
          loadingData={loadingData}
          user={user}
        />
      )}
    </>
  );
};
