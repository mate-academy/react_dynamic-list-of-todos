/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';

import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosToRender, setTodosToRender] = useState<Todo[]>([]);
  const [loadTodosSpinner, setLoadTodosSpinner] = useState<boolean>(false);
  const [isLoadedTodos, setIsLoadedTodos] = useState<boolean>(false);

  const [filterByStatus, setFilterByStatus] = useState<FilterBy>(FilterBy.all);
  const [query, setQuery] = useState<string>('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoadTodosSpinner(true);

    getTodos()
      .then(setTodos)
      .then(() => setIsLoadedTodos(true))
      .finally(() => {
        setLoadTodosSpinner(false);
      });
  }, []);

  const applyFilterByStatus = useCallback((val: FilterBy) => {
    // eslint-disable-next-line no-param-reassign
    setFilterByStatus(val);
  }, []);

  const closeModal = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    const filteredByQuery = query
      ? todos.filter(todo => {
        return todo.title.toLowerCase().includes(query.toLowerCase());
      })
      : todos;

    const filteredByStatus = filteredByQuery.filter(todo => {
      switch (filterByStatus) {
        case FilterBy.active:
          return !todo.completed;
        case FilterBy.completed:
          return todo.completed;
        default:
          return true;
      }
    });

    setTodosToRender(filteredByStatus);
  }, [todos, query, filterByStatus]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={applyFilterByStatus}
                onQueryChange={setQuery}
                appliedFilter={filterByStatus}
              />
            </div>

            <div className="block">
              {loadTodosSpinner && (
                <Loader />
              )}
              {isLoadedTodos && (
                <TodoList
                  todos={todosToRender}
                  selectedTodo={selectedTodo}
                  onSelectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onCloseModal={closeModal}
        />
      )}
    </>
  );
};
