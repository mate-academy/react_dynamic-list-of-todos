/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos, getUser } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { ByStatus } from './types/ByStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filtredByStatus, setFiltredByStatus] = useState<ByStatus>(
    ByStatus.all,
  );
  const [query, setQuery] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then((fetchedTodos) => {
      setTodos(fetchedTodos);
      setIsLoading(false);
    });
  }, []);

  const handleShowTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
    setIsLoadingUser(true);

    getUser(todo.userId).then((user) => {
      setSelectedUser(user);
      setIsLoadingUser(false);
    });
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filtredByStatus) {
      case ByStatus.all:
        return true;
      case ByStatus.activ:
        return !todo.completed;
      case ByStatus.completed:
        return todo.completed;
      default:
        return true;
    }
  }).filter(todo => {
    return todo.title.includes(query.trim().toLowerCase());
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFiltredByStatus={setFiltredByStatus}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading ? (
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

      {showModal && (
        <TodoModal
          setShowModal={setShowModal}
          isLoadingUser={isLoadingUser}
          selectedUser={selectedUser}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
