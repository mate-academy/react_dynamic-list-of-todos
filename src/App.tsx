/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
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
  const [loadingList, setLoadingList] = useState<boolean>(false);
  const [loadingModal, setLoadingModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setLoadingList(true);
    getTodos()
      .then(res => {
        setTodos(res);
        setVisibleTodos(res);
      })
      .finally(() => setLoadingList(false));
  }, []);

  const select = useCallback((todo: Todo): void => {
    setLoadingModal(true);
    setSelectedTodo(todo);
    getUser(todo.userId).then(setSelectedUser);
  }, []);

  const reset = useCallback((): void => {
    setLoadingModal(false);
    setSelectedUser(null);
    setSelectedTodo(null);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} setViewableTodos={setVisibleTodos} />
            </div>

            <div className="block">
              {loadingList ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  select={select}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {loadingModal && (
        <TodoModal user={selectedUser} todo={selectedTodo} reset={reset} />
      )}
    </>
  );
};
