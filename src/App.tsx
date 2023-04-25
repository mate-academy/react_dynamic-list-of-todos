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
  const [isDeleteButtonAval, setDeleteButtonAval] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isModalShown, setModalShown] = useState(false);
  const [isDataLoaded, setDataLoaded] = useState('isLoading');
  const [isTodoLoaded, setTodoLoaded] = useState('isLoading');

  const loadTodos = async () => {
    setDataLoaded('isLoading');
    try {
      const todos = await getTodos();

      setAllTodos(todos);
      setDataLoaded('loaded');
    } catch (err) {
      setDataLoaded('error');
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const selectHandler = (event: React.FormEvent<HTMLSelectElement>) => {
    setFilteredBy(event.currentTarget.value);
  };

  const inputHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
    setDeleteButtonAval(true);
  };

  const clearInput = () => {
    setSearchValue('');
    setDeleteButtonAval(false);
  };

  const getTodoInfo = (selectedTodo: Todo) => {
    setUser(null);
    setModalShown(true);
    setTodo(selectedTodo);
    getUser(selectedTodo.userId)
      .then(currUser => {
        setUser(currUser);
        setTodoLoaded('loaded');
      })
      .catch(() => {
        setTodoLoaded('error');
      });
  };

  const closeModal = () => {
    setTodo(null);
    setModalShown(false);
    setTodoLoaded('isLoading');
  };

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
                isDeleteButtonAval={isDeleteButtonAval}
                clearInput={clearInput}
              />
            </div>

            <div className="block">
              {isDataLoaded === 'isLoading' && <Loader />}
              {isDataLoaded === 'loaded' && (
                <TodoList
                  todos={allTodos}
                  filteredBy={filteredBy}
                  searchQuery={searchValue}
                  getTodoInfo={getTodoInfo}
                  todoId={todo?.id || null}
                />
              )}
              {isDataLoaded === 'error' && (
                // eslint-disable-next-line react/jsx-one-expression-per-line
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
          loadStatus={isTodoLoaded}
        />
      )}
    </>
  );
};
