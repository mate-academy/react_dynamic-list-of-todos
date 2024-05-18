/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { FilterOptions } from './types/FilterOptions';
import { User } from './types/User';

export const filterByQuery = (todos: Todo[], query: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  return todos.filter(todo => todo.title.includes(normalizedQuery));
};

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FilterOptions.All);
  const [appliedQuery, setAppliedQuery] = useState('');
  const [userLoading, setUserLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [modalIsActive, setModalIsActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();

      setTodos(fetchedTodos);
    };

    fetchTodos();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const visibleTodos = useMemo(
    () => filterByQuery(todos, appliedQuery),
    [appliedQuery, todos],
  );

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleQueryChange = (newSearch: string) => {
    setAppliedQuery(newSearch);
  };

  const handleHideUser = () => {
    setUserInfo(false);
    setModalIsActive(false);
    setSelectedUser(null);
    setSelectedTodo(null);
  };

  const handleShowUser = async (todo: Todo) => {
    const user = await getUser(todo.userId);

    setTimeout(() => {
      setUserLoading(false);
      setUserInfo(true);
    }, 300);

    setSelectedUser(user);
    setSelectedTodo(todo);
    setModalIsActive(true);
    setUserLoading(true);
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case FilterOptions.Active:
        return visibleTodos.filter(todo => !todo.completed);
      case FilterOptions.Completed:
        return visibleTodos.filter(todo => todo.completed);
      default:
        return visibleTodos;
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={handleFilterChange}
                onQueryChange={handleQueryChange}
                appliedQuery={appliedQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={getFilteredTodos()}
                  handleShowUser={handleShowUser}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        userLoading={userLoading}
        userInfo={userInfo}
        modalIsActive={modalIsActive}
        handleHideUser={handleHideUser}
        selectedUser={selectedUser}
        todos={visibleTodos}
        selectedTodo={selectedTodo}
      />
    </>
  );
};
