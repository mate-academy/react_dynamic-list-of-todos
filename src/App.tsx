/* eslint-disable no-extra-boolean-cast */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';

import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [filteredBy, setFilteredBy] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [isDeleteButtonAvailable, setDeleteButtonAvailable] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isModalShown, setModalShown] = useState(false);
  const [isDataLoading, setDataLoading] = useState(true);
  const [isLoadedError, setLoadedError] = useState(false);

  const loadTodos = async () => {
    setDataLoading(true);
    try {
      const todos = await getTodos();

      setAllTodos(todos);
    } catch (err) {
      setLoadedError(true);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (searchValue === '') {
      setDeleteButtonAvailable(false);
    }
  }, [searchValue]);

  const selectHandler = (event: React.FormEvent<HTMLSelectElement>) => {
    setFilteredBy(event.currentTarget.value);
  };

  const inputHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
    setDeleteButtonAvailable(true);
  };

  const clearInput = () => {
    setSearchValue('');
    setDeleteButtonAvailable(false);
  };

  const getTodoInfo = (selectedTodo: Todo) => {
    setUser(null);
    setModalShown(true);
    setTodo(selectedTodo);
    getUser(selectedTodo.userId)
      .then(currUser => {
        setUser(currUser);
      })
      .catch(() => {
        setLoadedError(true);
      });
  };

  const closeModal = () => {
    setTodo(null);
    setModalShown(false);
    setLoadedError(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filteredBy={filteredBy}
                selectHandler={selectHandler}
                searchValue={searchValue}
                inputHandler={inputHandler}
                isDeleteButtonAvailable={isDeleteButtonAvailable}
                clearInput={clearInput}
              />
            </div>

            <div className="block">
              {isDataLoading && <Loader />}

              {!isDataLoading && (!isLoadedError || isModalShown) && (
                <TodoList
                  todos={allTodos}
                  filteredBy={filteredBy}
                  searchQuery={searchValue}
                  getTodoInfo={getTodoInfo}
                  todoId={todo?.id || null}
                />
              )}

              {isLoadedError && (
                <p>Error. Data not loaded</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalShown && (
        <TodoModal
          user={user}
          todo={todo}
          closeModal={closeModal}
          isError={isLoadedError}
        />
      )}
    </>
  );
};
