/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { TodoSelect, UsersTodo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [usersTodos, setUsersTodos] = useState<UsersTodo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<UsersTodo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<TodoSelect>(
    TodoSelect.ALL,
  );
  const [selectedTodo, setSelectedTodo] = useState<UsersTodo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    getTodos()
      .then(todos =>
        Promise.all(
          todos.map(async todo => ({
            ...todo,
            user: await getUser(todo.userId),
          })),
        ),
      )
      .then(setUsersTodos)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filterTodos = (
    todos: UsersTodo[],
    criteria: TodoSelect,
    query: string,
  ) => {
    let filtered = (() => {
      switch (criteria) {
        case TodoSelect.ACTIVE:
          return todos.filter(todo => !todo.completed);

        case TodoSelect.COMPLETED:
          return todos.filter(todo => todo.completed);

        case TodoSelect.ALL:
        default:
          return todos.slice();
      }
    })();

    // search
    if (query.trim()) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filtered;
  };

  const handleTodosFilter = (criteria: TodoSelect) => {
    setSelectedFilter(criteria);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  useEffect(() => {
    setVisibleTodos(filterTodos(usersTodos, selectedFilter, searchQuery));
  }, [usersTodos, selectedFilter, searchQuery]);

  const handleSelectTodo = (todo: UsersTodo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
    setIsUserLoading(true);

    getUser(todo.userId)
      .then(user => {
        setSelectedTodo(prev => (prev ? { ...prev, user } : null));
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
                onFilterSelect={handleTodosFilter}
                onSearch={handleSearch}
                onClearSearch={handleClearSearch}
                searchQuery={searchQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodo={selectedTodo}
                onSelectTodo={handleSelectTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedTodo && (
        <TodoModal
          isLoading={isUserLoading}
          selectedTodo={selectedTodo}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
