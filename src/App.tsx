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
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [todoModal, setTodoModal] = useState<Todo | null>(null);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Status>(Status.all);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(-1);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const loadUserDetails = (userId: number) => {
    setIsLoadingModal(true);
    getUser(userId)
      .then(setUserDetails)
      .finally(() => setIsLoadingModal(false));
  };

  const handleShowTodo = (todo: Todo) => {
    setTodoModal(todo);
    loadUserDetails(todo.userId);
  };

  const closeModal = () => {
    setTodoModal(null);
    setSelectedId(-1);
  };

  const todosFiltered = () => {
    switch (selectedStatus) {
      case Status.completed: {
        const filtered = todos.filter((todo) => todo.completed);

        return filtered.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()));
      }

      case Status.active: {
        const filtered = todos.filter((todo) => !todo.completed);

        return filtered.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()));
      }

      default:
        return todos.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()));
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
                setStatus={setSelectedStatus}
                status={selectedStatus}
                query={query}
                setQuery={setQuery}
                todos={todos}
                setTodos={setTodos}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={todosFiltered()}
                showTodo={handleShowTodo}
                selected={selectedId}
                setSelectedId={setSelectedId}
              />
            </div>
          </div>
        </div>
      </div>
      {todoModal && !isLoading && (
        <TodoModal
          todo={todoModal}
          isLoadingUser={isLoadingModal}
          user={userDetails}
          close={closeModal}
        />
      )}
    </>
  );
};
