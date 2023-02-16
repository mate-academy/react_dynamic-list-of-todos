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
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosFetching, setIsTodosFetching] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isUserFetching, setIsUserFetching] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const searchTodo = (todo: Todo) => {
    const lowerCasedQuery = searchQuery.toLowerCase().trim();
    const lowerCasedTitle = todo.title.toLowerCase();

    return lowerCasedTitle.includes(lowerCasedQuery);
  };

  const visibleTodos = todos
    .filter(searchTodo)
    .filter(todo => {
      switch (filter) {
        case 'completed':
          return todo.completed;

        case 'active':
          return !todo.completed;

        default:
          return true;
      }
    });

  const handleGetUser = async (todo: Todo) => {
    setIsUserFetching(true);
    const selectedUser = await getUser(todo.userId);

    setUser(selectedUser);
    setIsUserFetching(false);
  };

  const handleShowButton = (todo: Todo) => {
    setSelectedTodo(todo);
    handleGetUser(todo);
    setIsModalVisible(true);
  };

  const handleGetTodos = async () => {
    const todosList = await getTodos();

    setTodos(todosList);
    setIsTodosFetching(false);
  };

  useEffect(() => {
    handleGetTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                handleSearch={setSearchQuery}
                handleFilter={setFilter}
              />
            </div>

            <div className="block">
              {isTodosFetching
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    handleShowButton={handleShowButton}
                    selectedTodo={selectedTodo}
                    isModalVisible={isModalVisible}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          isVisible={isModalVisible}
          isFetching={isUserFetching}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </>
  );
};
