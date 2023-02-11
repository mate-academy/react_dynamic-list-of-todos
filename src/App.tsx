import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { OptionalTodo } from './types/OptionalTodo';

import { FilterOptions } from './enums/FilterOptions';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [areTodosLoading, setAreTodosLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<OptionalTodo>(null);
  const [selectedFilter, setSelectedFilter] = useState(FilterOptions.All);
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    getTodos().then((downloadedTodos) => {
      setTodos(downloadedTodos);
      setAreTodosLoading(false);
    });
  }, []);

  const filteredTodosByOption = useMemo(() => {
    return todos.filter((todo) => {
      switch (selectedFilter) {
        case FilterOptions.All:
          return true;

        case FilterOptions.Active:
          return !todo.completed;

        case FilterOptions.Completed:
          return todo.completed;

        default:
          return true;
      }
    });
  }, [selectedFilter, todos]);

  const filteredTodos = useMemo(() => {
    return filteredTodosByOption.filter((todo) => {
      return todo.title
        .toLowerCase()
        .includes(filterQuery.trim().toLowerCase());
    });
  }, [filterQuery, filteredTodosByOption]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilter={selectedFilter}
                searchQuery={filterQuery}
                onSelectedFilterChange={setSelectedFilter}
                onSearchQueryChange={setFilterQuery}
              />
            </div>

            <div className="block">
              {areTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id || 0}
                  selectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          closeTodoModal={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
