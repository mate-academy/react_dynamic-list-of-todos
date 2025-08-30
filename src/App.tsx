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

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<Filter>('all');
  // const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(todoFromApi => {
        setTodos(todoFromApi);
        // setVisibleTodos(todoFromApi);
      })
      .catch(error => setErrorMessage(error.message))
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = todos
    .filter(todo => {
      if (selectedFilter === 'active') {
        return !todo.completed;
      }

      if (selectedFilter === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title" data-cy="title">
              Todos:
            </h1>

            <div className="block">
              <TodoFilter
                query={query}
                filter={selectedFilter}
                onQueryChange={setQuery}
                onFilterChange={setSelectedFilter}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && !errorMessage && (
                <TodoList
                  todos={visibleTodos}
                  onTodoSelect={(todo: Todo) => setSelectedTodo(todo)}
                  selectedTodo={selectedTodo}
                />
              )}

              {!loading && errorMessage && (
                <div className="notification is-danger" data-cy="error">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onModalClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
