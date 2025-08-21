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
import { filterTodosByTitle } from './utils/filterTodosByTitle';
import { filterTodosByStatus } from './utils/filterTodosByStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [todosLoading, setTodosLoading] = useState(true); // for list

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentUserId, setCurrentUserId] = useState(-1);
  const [userLoading, setUserLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setTodosLoading(true);
    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
        setFilteredTodos(fetchedTodos);
      })
      .finally(() => setTodosLoading(false));
  }, []);

  useEffect(() => {
    let result = todos;

    if (query) {
      result = filterTodosByTitle(result, query);
    }

    if (filter) {
      result = filterTodosByStatus(result, filter);
    }

    setFilteredTodos(result);
  }, [query, filter, todos]);

  useEffect(() => {
    if (currentUserId >= 0) {
      getUser(currentUserId).then(setCurrentUser);
    } else {
      setCurrentUser(null);
    }
  }, [currentUserId]);

  useEffect(() => {
    if (currentTodo) {
      setUserLoading(true);
      getUser(currentTodo.userId)
        .then(setCurrentUser)
        .finally(() => setUserLoading(false));
    } else {
      setCurrentUser(null);
    }
  }, [currentTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              {!todosLoading && (
                <TodoFilter
                  query={query}
                  queryHandler={setQuery}
                  filterHandler={setFilter}
                />
              )}
            </div>

            <div className="block">
              {todosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  userIdHandler={setCurrentUserId}
                  currentTodo={currentTodo}
                  todoHandler={setCurrentTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          loading={userLoading}
          user={currentUser}
          userIdHandler={setCurrentUserId}
          todo={currentTodo}
          todoHandler={setCurrentTodo}
        />
      )}
    </>
  );
};
