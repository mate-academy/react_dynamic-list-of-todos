/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(todosList => {
      setTodos(todosList);
      setInitialTodos(todosList);
    });
  }, []);

  const handleEyeClick = useCallback(
    (selectedUserId: number, selectedTodoId: number) => {
      getUser(selectedUserId).then(setSelectedUser);
      setSelectedTodo(todos.find(todo => todo.id === selectedTodoId) || null);
    },
    [todos],
  );

  const handleFiltrationQueries = useCallback(
    (finishQuery = 'all', searchQuery = '') => {
      setTodos(
        initialTodos.filter(todo => {
          if (finishQuery === 'all') {
            return todo.title.toLowerCase().includes(searchQuery.toLowerCase());
          }

          return (
            todo.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            todo.completed === (finishQuery === 'active' ? false : true)
          );
        }),
      );
    },
    [initialTodos],
  );

  const handleCancelSelection = useCallback(() => {
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
              <TodoFilter handleFiltrationQueries={handleFiltrationQueries} />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={todos}
                handleEyeClick={handleEyeClick}
                selectedTodoId={selectedTodo?.id ?? null}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedUser && (
        <TodoModal
          selectedUser={selectedUser}
          userTodo={selectedTodo}
          resetSelection={handleCancelSelection}
        />
      )}
    </>
  );
};
