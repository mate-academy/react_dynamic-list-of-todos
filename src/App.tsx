/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { TodoModal } from './components/TodoModal';
import { User } from './types/User';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedId, setSelectedId] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSelectedLoading, setIsSelectedLoading] = useState(true);

  useEffect(() => {
    getTodos().then(setTodos);
    getTodos().then(setFilteredTodos).finally(() => setIsLoading(false));
  }, []);

  const filterTodos = (newTodos: Todo[]) => {
    setFilteredTodos(newTodos);
  };

  const selectTodoId = (todoId: number) => {
    setSelectedId(todoId);
  };

  const selectUser = (userId: number) => {
    setIsSelectedLoading(true);
    getUser(userId).then(setSelectedUser).finally(() => setIsSelectedLoading(false));
  };

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    selectUser(todo.userId);
  };

  const reset = () => {
    setSelectedId(0);
    setSelectedTodo(undefined);
    setSelectedUser(undefined);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterTodos={filterTodos}
                todos={todos}
              />
            </div>

            <div className="block">
              {isLoading ? <Loader /> : (
                <TodoList todos={filteredTodos} selectedId={selectedId} selectTodoId={selectTodoId} selectTodo={selectTodo} />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedId && (
        <TodoModal selectedUser={selectedUser} selectedTodo={selectedTodo} reset={reset} isSelectedLoading={isSelectedLoading} />
      )}
    </>
  );
};
