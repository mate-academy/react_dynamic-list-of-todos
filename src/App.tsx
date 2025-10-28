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
import { TodoStatusFilter } from './types/Filter';

function getFilteredTodos(
  todos: Todo[],
  query: string,
  status: TodoStatusFilter,
) {
  let preparedTodos = todos;
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
    preparedTodos = preparedTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  if (status === TodoStatusFilter.Completed) {
    preparedTodos = preparedTodos.filter(todo => todo.completed);
  } else if (status === TodoStatusFilter.Active) {
    preparedTodos = preparedTodos.filter(todo => !todo.completed);
  }

  return preparedTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [statusFilter, setStatusFilter] = useState<TodoStatusFilter>(
    TodoStatusFilter.All,
  );
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = getFilteredTodos(todos, query, statusFilter);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={statusFilter}
                search={query}
                onStatusChange={setStatusFilter}
                onSearchChange={setQuery}
                onClearSearch={() => setQuery('')}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  onSelect={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
