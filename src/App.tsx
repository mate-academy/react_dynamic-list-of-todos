/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(data => {
        setTodos(data);
        setFilteredTodos(data);
      })
      .catch(error => setErrorMessage(error.message))
      .finally(() => setLoading(false));
  }, []);

  function getTodoByUserId(todo: Todo) {
    setUserLoading(true);
    setCurrentTodo(todo);

    getUser(todo.userId)
      .then(setCurrentUser)
      .catch(error => setErrorMessage(error.message));

    setTimeout(() => setUserLoading(false), 300);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} setFilteredTodos={setFilteredTodos} />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && errorMessage && (
                <div className="notification is-danger">{errorMessage}</div>
              )}

              {!loading && !errorMessage && filteredTodos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={getTodoByUserId}
                  currentTodo={currentTodo}
                />
              )}

              {!loading && !errorMessage && filteredTodos.length === 0 && (
                <p className="title is-5">There are no users</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          currentTodo={currentTodo}
          currentUser={currentUser}
          userLoading={userLoading}
          onDeleteTodo={setCurrentTodo}
        />
      )}
    </>
  );
};
