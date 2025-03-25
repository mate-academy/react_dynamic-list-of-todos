/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export enum DropdownOptions {
  DEFAULT = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

const handleFilter = (
  initialTodoList: Todo[],
  completionStatusFilter: DropdownOptions,
  inputQuery: string,
) => {
  let result = [...initialTodoList];

  if (completionStatusFilter === DropdownOptions.ACTIVE) {
    result = result.filter(item => item.completed === false);
  }

  if (completionStatusFilter === DropdownOptions.COMPLETED) {
    result = result.filter(item => item.completed === true);
  }

  if (inputQuery) {
    result = result.filter(item => {
      const normalizedQuery = inputQuery.trim().toLowerCase();
      const normalizedTitle = item.title.toLowerCase();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  return result;
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [todosToUse, setTodosToUse] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [completionStatusFilter, setCompletionStatusFilter] = useState(
    DropdownOptions.DEFAULT,
  );
  const [inputQuery, setInputQuery] = useState('');

  const visibleTodos = handleFilter(
    todosToUse,
    completionStatusFilter,
    inputQuery,
  );

  const handleSelectTodo = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    selectedTodo: Todo,
  ) => {
    setTodo(selectedTodo);
  };

  const handleCloseModal = () => {
    setTodo(null);
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todos => {
        setTodosToUse(todos);
      })
      .catch(() => setErrorMessage('Unexpected error, please try again later'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setCompletionStatusFilter={setCompletionStatusFilter}
                setInputQuery={setInputQuery}
                inputQuery={inputQuery}
                completionStatusFilter={completionStatusFilter}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && errorMessage && <p>{errorMessage}</p>}
              {!isLoading && todosToUse.length > 0 && !errorMessage && (
                <TodoList
                  todos={visibleTodos}
                  handleSelectTodo={handleSelectTodo}
                  selectedTodo={todo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todo && (
        <TodoModal
          selectedTodo={todo}
          handleCloseModal={handleCloseModal}
          setErrorMessage={setErrorMessage}
        />
      )}
    </>
  );
};
