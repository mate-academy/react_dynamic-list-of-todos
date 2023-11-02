/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosError, setTodosError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(Filter.All);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch((error) => setTodosError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = useMemo(() => (
    todos.filter(todo => {
      switch (filter) {
        case Filter.Active:
          return !todo.completed;

        case Filter.Completed:
          return todo.completed;

        case Filter.All:
        default:
          return true;
      }
    })
      .filter(todo => {
        const lowerQuery = query.toLowerCase();

        return todo.title.toLowerCase().includes(lowerQuery);
      })
  ), [query, filter, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                onFilterChange={setFilter}
                filter={filter}
              />
            </div>

            <div className="block">

              {loading && (
                <Loader />
              )}

              {todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id ?? 0}
                  onTodoSelected={setSelectedTodo}
                />
              )}

              {todosError && (
                <p>{todosError}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onClose={() => setSelectedTodo(null)}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
