/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterOptions } from './types/FilterOptions';

const prepareTodos = (
  todos: Todo[],
  filterOption: FilterOptions,
  query: string,
) => {
  return todos
    .filter(todo => {
      switch (filterOption) {
        case FilterOptions.Completed:
          return todo.completed;

        case FilterOptions.Active:
          return todo.completed === false;

        case FilterOptions.All:
          return true;
      }
    })
    .filter(todo => {
      return todo.title
        .toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase());
    });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosFilterOption, setTodosFilterOption] = useState<FilterOptions>(
    FilterOptions.All,
  );
  const [selectedTodoId, setSelectedTodoId] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);
  const preparedTodos = prepareTodos(todos, todosFilterOption, searchQuery);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Loading data error');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleModalClose = () => {
    setSelectedTodoId(-1);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterOption={todosFilterOption}
                searchQuery={searchQuery}
                onSearchQueryChanged={setSearchQuery}
                onFilterOptionSelected={setTodosFilterOption}
              />
            </div>

            <div className="block">
              {errorMessage ? (
                <p>{errorMessage}</p>
              ) : isLoading ? (
                <Loader />
              ) : preparedTodos.length === 0 ? (
                <p>No todos match your current filters.</p>
              ) : (
                <TodoList
                  todos={preparedTodos}
                  selectedTodoId={selectedTodoId}
                  onTodoSelect={setSelectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          key={selectedTodoId}
          todo={selectedTodo}
          onModalClose={handleModalClose}
        />
      )}
    </>
  );
};
