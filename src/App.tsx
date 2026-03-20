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
import { FilterTypes } from './components/enums/FilterTypes';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoading, setTodosLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterType, setFilterType] = useState(FilterTypes.Default);
  const [searchQuery, setSearchQuery] = useState('');

  const getPreparedTodos = (
    initialTodos: Todo[],
    type: FilterTypes,
    query: string,
  ): Todo[] => {
    let preparedTodos = [...initialTodos];

    if (type && type !== FilterTypes.All) {
      preparedTodos = preparedTodos.filter(todo => {
        switch (type) {
          case FilterTypes.Active:
            return !todo.completed;
          case FilterTypes.Completed:
            return todo.completed;
        }
      });
    }

    if (query) {
      const normalizedQuery = query.toLowerCase();

      preparedTodos = preparedTodos.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    return preparedTodos;
  };

  const preparedTodos = getPreparedTodos(todos, filterType, searchQuery);

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
      setTodosLoading(false);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={filterType}
                onFilterTypeSelect={setFilterType}
                onSearchQueryChange={setSearchQuery}
                searchQuery={searchQuery}
              />
            </div>

            <div className="block">
              {todosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={preparedTodos}
                  selectedTodo={selectedTodo}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onModalClose={setSelectedTodo} />
      )}
    </>
  );
};
