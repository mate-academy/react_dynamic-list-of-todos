/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getTodos } from './api';

type FilterParams = {
  query: string;
  filterStatus: Status;
};

function getFilteredTodos(
  todos: Todo[],
  { query, filterStatus }: FilterParams,
) {
  let preparedTodos = [...todos];

  switch (filterStatus) {
    case Status.Active:
      preparedTodos = preparedTodos.filter(todo => !todo.completed);
      break;
    case Status.Completed:
      preparedTodos = preparedTodos.filter(todo => todo.completed);
      break;
    default:
      break;
  }

  const normalizedQuery = query.toLowerCase().trim();

  if (normalizedQuery) {
    preparedTodos = preparedTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  return preparedTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState(Status.All);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const preparedTodos = getFilteredTodos(todos, { query, filterStatus });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeFilter={setFilterStatus}
                filterStatus={filterStatus}
                query={query}
                onChangeQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={preparedTodos}
                  onSelect={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        onClose={() => setSelectedTodo(null)}
        selectedTodo={selectedTodo}
      />
    </>
  );
};
