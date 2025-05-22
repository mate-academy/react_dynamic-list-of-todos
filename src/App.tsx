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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);

  type FilterType = 'all' | 'active' | 'completed';
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);
  const [query, setQuery] = useState<string>('');
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    setIsLoadingTodos(true);

    getTodos()
      .then(data => {
        setTodos(data);
      })
      .finally(() => setIsLoadingTodos(false));
  }, []);

  // Filter todos whenever the selectedFilter changes

  useEffect(() => {
    let filteredList: Todo[];

    switch (selectedFilter) {
      case 'completed':
        filteredList = todos.filter(todo => todo.completed);
        break;
      case 'active':
        filteredList = todos.filter(todo => !todo.completed);
        break;
      default:
        filteredList = [...todos];
        break;
    }

    if (query.trim()) {
      filteredList = filteredList.filter(todo =>
        todo.title.toLowerCase().includes(query.trim().toLowerCase()),
      );
    }

    setFilteredTodos(filteredList);
  }, [selectedFilter, todos, query]);

  const changeTitleUsedQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const clearQuery = () => {
    setQuery('');
    setSelectedFilter('all');
  };

  const handleShowTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalActive(true);
    setUserLoading(true);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => setUserLoading(false));
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
    setSelectedTodo(null);
    setUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
                query={query}
                changeTitleUsedQuery={changeTitleUsedQuery}
                clearQuery={clearQuery}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  handleShowTodo={handleShowTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalActive && selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          userLoading={userLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
