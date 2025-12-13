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
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosId, setTodosId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoadingTodos(false));
  }, []);

  useEffect(() => {
    if (userId === 0) {
      return;
    }

    setIsLoadingUser(true);

    getUser(userId)
      .then(setUser)
      .finally(() => setIsLoadingUser(false));
  }, [userId]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuery={setQuery}
                query={query}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  setIsOpened={setIsOpened}
                  setTodosId={setTodosId}
                  setUserId={setUserId}
                  todos={todos}
                  isOpened={isOpened}
                  todosId={todosId}
                  query={query}
                  filter={filter}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isOpened && (
        <TodoModal
          isLoadingUser={isLoadingUser}
          setIsOpened={setIsOpened}
          todos={todos}
          todosId={todosId}
          user={user}
        />
      )}
    </>
  );
};
