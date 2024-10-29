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
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loadingTodo, setLoadingTodo] = useState(true);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [selectedStatus, setSelectedStatus] = useState<Status>(Status.ALL);

  const [query, setQuery] = useState('');

  const handleSelectedStatus = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;

    if (Object.values(Status).includes(value as Status)) {
      setSelectedStatus(value as Status);
    }
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const showSelectedTodo = (todo: Todo) => {
    setSelectedTodo(todo);

    getUser(todo.userId)
      .then(setSelectedUser)
      .finally(() => setLoadingUser(false));
  };

  const closeSelectedTodo = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  const resetStatus = () => {
    setQuery('');
    setSelectedStatus(Status.ALL);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoadingTodo(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                inputValue={query}
                handleSelectedStatus={handleSelectedStatus}
                handleQueryChange={handleQuery}
                resetStatus={resetStatus}
              />
            </div>

            <div className="block">
              {loadingTodo && <Loader />}
              <TodoList
                todos={todos}
                showSelectedTodo={showSelectedTodo}
                selectedStatus={selectedStatus}
                query={query}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          closeTodo={closeSelectedTodo}
          user={selectedUser}
          loadingUser={loadingUser}
        />
      )}
    </>
  );
};
