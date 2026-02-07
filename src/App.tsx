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
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [errorRequestTodo, setErrorRequestTodo] = useState<string | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorRequestTodo('Error loading Todos');
      })
      .finally(() => setLoading(false));
  }, []);

  function prepareTodos(searchQuery: string, statusFilter: Filter) {
    let preparedTodos = todos;

    if (statusFilter === 'active') {
      preparedTodos = preparedTodos.filter(todo => !todo.completed);
    }

    if (statusFilter === 'completed') {
      preparedTodos = preparedTodos.filter(todo => todo.completed);
    }

    if (searchQuery) {
      preparedTodos = preparedTodos.filter(todo =>
        todo.title
          .toLocaleLowerCase()
          .includes(searchQuery.toLowerCase().trim()),
      );
    }

    return preparedTodos;
  }

  const filteredTodos = prepareTodos(query, filter);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : errorRequestTodo ? (
                <p className="has-text-danger">{errorRequestTodo}</p>
              ) : (
                <table className="table is-narrow is-fullwidth">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                      </th>
                      <th>Title</th>
                      <th> </th>
                    </tr>
                  </thead>

                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    onSelect={setSelectedTodo}
                  />
                </table>
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
