/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { Status, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

interface FilterParams {
  selectedStatus: Status,
  query: string,
}

const getPreparedTodos = (currentTodos: Todo[], { selectedStatus, query }: FilterParams) => {
  let preparedTodos = [...currentTodos];

  if (selectedStatus) {
    preparedTodos = preparedTodos.filter(todo => {
      switch (selectedStatus) {
        case Status.active:
          return !todo.completed;
        case Status.completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }

  if (query) {
    preparedTodos = preparedTodos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  }

  return preparedTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [selectedStatus, setSelectedStatus] = useState(Status.all);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = (status: Status) => {
    setSelectedStatus(status);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const visibleTodos = getPreparedTodos(todos, { selectedStatus, query });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedStatus={selectedStatus}
                onStatusChange={handleStatusChange}
                query={query}
                onQueryChange={handleQueryChange}
              />
            </div>

            <div className="block">
              {loading && (<Loader />)}

              {!loading && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onSelect={setSelectedTodo} />
      )}
    </>
  );
};
