/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { ModalProvider } from './components/ModalContext';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [todoForSelectUser, setTodoForSelectUser] = useState<Todo | null>(null);
  const [optionFilter, setOptionFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorUserMessage, setErrorUserMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(newData => setTodos(newData))
      .catch(error =>
        setErrorMessage(new Error(`todo data loading error: ${error}`).message),
      )
      .finally(() => setIsLoading(false));
  }, []);

  const onSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOptionFilter(event.target.value);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value);
  };

  const onClearSearch = () => setSearchFilter('');

  const filteredTodos = useMemo(() => {
    let result = [...todos];

    switch (optionFilter) {
      case 'completed':
        result = result.filter(todo => todo.completed);
        break;
      case 'active':
        result = result.filter(todo => !todo.completed);
        break;
      default:
        break;
    }

    if (searchFilter.trim()) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(searchFilter.toLowerCase()),
      );
    }

    return result;
  }, [optionFilter, todos, searchFilter]);

  const onOpenModal = (userId: number, todo: Todo) => {
    getUser(userId)
      .then(userData => setUser(userData))
      .catch(error =>
        setErrorUserMessage(
          new Error(`User data loading error: ${error}`).message,
        ),
      );
    setTodoForSelectUser(todo);
  };

  const onCloseModal = () => {
    setTodoForSelectUser(null);
    setUser(null);
  };

  return (
    <ModalProvider>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectOption={onSelectOption}
                onChangeInput={onChangeInput}
                onClearSearch={onClearSearch}
                valueInput={searchFilter}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {errorMessage || (
                <TodoList
                  todos={filteredTodos}
                  onOpenModal={onOpenModal}
                  errorUser={errorUserMessage}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {errorUserMessage ? (
        <>{alert('User data loading error, please relod peage')}</>
      ) : (
        todoForSelectUser && (
          <TodoModal
            user={user}
            todo={todoForSelectUser}
            onCloseModal={onCloseModal}
          />
        )
      )}
    </ModalProvider>
  );
};
