/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { StatusFilterValue, Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';

const getPreparedTodos = (
  todos: Todo[],
  filterValue: StatusFilterValue,
  query: string,
): Todo[] => {
  let result;

  switch (filterValue) {
    case StatusFilterValue.Active:
      result = todos.filter(todo => !todo.completed);
      break;
    case StatusFilterValue.Complited:
      result = todos.filter(todo => todo.completed);
      break;
    default:
      result = todos;
  }

  if (query) {
    result = result.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return result;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>(
    StatusFilterValue.All,
  );
  const [query, setQuery] = useState('');

  const handleTogglingTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const preparedTodos = getPreparedTodos(todos, statusFilter, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onStatusSelected={setStatusFilter}
                statusFilter={statusFilter}
                onQueryChange={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && preparedTodos.length > 0 && (
                <TodoList
                  todos={preparedTodos}
                  onTodoSelected={handleTogglingTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleTogglingTodo} />
      )}
    </>
  );
};
