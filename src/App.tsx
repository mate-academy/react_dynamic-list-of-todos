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
import { Type } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filter, setFilter] = useState<Type>(Type.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setError('Something went wrong. Please, try again later.'))
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesStatus =
        filter === Type.All ||
        (filter === Type.Active && !todo.completed) ||
        (filter === Type.Completed && todo.completed);

      const matchesQuery = todo.title
        .toLowerCase()
        .includes(searchInput.toLowerCase());

      return matchesStatus && matchesQuery;
    });
  }, [filter, searchInput, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                onFilterChange={setFilter}
                query={searchInput}
                onQueryChange={setSearchInput}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
              {error && <p className="has-text-danger">{error}</p>}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todo={selectedTodo}
        onCloseModal={() => setSelectedTodo(null)}
      />
    </>
  );
};
