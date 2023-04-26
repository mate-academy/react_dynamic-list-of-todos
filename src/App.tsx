/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
// eslint-disable-next-line import/no-cycle
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos, getUser } from './api';

import { Todo } from './types/Todo';
import { User } from './types/User';

export enum FilterValues {
  All = 'All',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loadedTodos, setLoadedTodos] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [loadedModal, setLoadedModal] = useState(false);
  const [filterValue, setFilterValue] = useState(FilterValues.All.toLowerCase());
  const [query, setQuery] = useState('');
  const [hasLoadingError, setHasLoadingError] = useState(false);

  let visibleTodos = filterValue === FilterValues.All.toLowerCase()
    ? todos
    : todos.filter(todo => {
      switch (filterValue) {
        case FilterValues.Active.toLowerCase():
          return todo.completed === false;

        case FilterValues.Completed.toLowerCase():
          return todo.completed === true;

        default:
          return todo;
      }
    });

  visibleTodos = visibleTodos.filter(todo => todo.title.includes(query));

  function getTodosfromServer() {
    getTodos().then((result: Todo[]) => {
      setTodos(result);
      setLoadedTodos(true);
    }).catch(() => {
      setLoadedTodos(true);
      setHasLoadingError(true);
    });
  }

  useEffect(() => {
    getTodosfromServer();
  }, []);

  const hangleLoadAgain = () => {
    getTodosfromServer();
    setLoadedTodos(false);
  };

  useEffect(() => {
    if (selectedUserId !== 0) {
      getUser(selectedUserId)
        .then((user: User) => {
          setSelectedUser(user);
          setLoadedModal(true);
        });
    }

    setLoadedModal(false);
  }, [selectedUserId]);

  const handleSelectUser = (userId: number, todo: Todo | null) => {
    setSelectedUserId(userId);
    setSelectedTodo(todo);
  };

  const handleFilterValue = (value: string) => {
    setFilterValue(value);
  };

  const handleInputValue = (value: string) => {
    setQuery(value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectValue={filterValue}
                onChangeSelect={handleFilterValue}
                inputValue={query}
                onChangeInput={handleInputValue}
              />
            </div>

            <div className="block">
              {!loadedTodos
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectUser={handleSelectUser}
                    hasLoadingError={hasLoadingError}
                    onAgain={hangleLoadAgain}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedUserId > 0 && (
        <TodoModal
          user={selectedUser}
          todo={selectedTodo}
          onClose={handleSelectUser}
          loadModal={loadedModal}
        />
      )}
    </>
  );
};
