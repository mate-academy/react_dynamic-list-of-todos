/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterValue, setFilterValue] = useState(Status.All);
  const [searchValue, setSearchValue] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>();

  useEffect(() => {
    getTodos()
      .then(setTodoList)
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos =
    todoList &&
    todoList
      .filter(todo => {
        switch (filterValue) {
          case Status.Active:
            return !todo.completed;
          case Status.Completed:
            return todo.completed;
          default:
            return todo;
        }
      })
      .filter(todo =>
        todo.title.toLowerCase().includes(searchValue.toLowerCase()),
      );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterValue={setFilterValue}
                setSearchValue={setSearchValue}
                searchValue={searchValue}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {visibleTodos && (
                <TodoList
                  visibleTodos={visibleTodos}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
              {errorMessage && (
                <p className="has-text-danger">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
