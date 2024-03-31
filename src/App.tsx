/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilteringOption } from './types/FilteringOption';
import { Status } from './types/Status';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';

const getPreparedTodos = (
  todos: Todo[],
  { selectedStatus, query }: FilteringOption,
) => {
  let preparedTodos = [...todos];

  switch (selectedStatus) {
    case Status.active:
      preparedTodos = todos.filter(todo => !todo.completed);
      break;
    case Status.completed:
      preparedTodos = todos.filter(todo => todo.completed);
      break;
  }

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    preparedTodos = preparedTodos.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  return preparedTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<Status>(Status.all);

  const visibleTodos = getPreparedTodos(todos, { selectedStatus, query });

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(true));
  }, []);

  const handleReset = () => {
    setQuery('');
    setSelectedStatus(Status.all);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                selectedStatus={selectedStatus}
                onReset={handleReset}
                onQueryChange={setQuery}
                onStatusChange={setSelectedStatus}
              />
            </div>

            {!isLoading ? (
              <Loader />
            ) : (
              <div className="block">
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} setSelectedTodo={setSelectedTodo} />
      )}
    </>
  );
};
