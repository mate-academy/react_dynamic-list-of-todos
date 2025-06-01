/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getVisibleTodos(
  todos: Todo[],
  sortField: string,
  query: string,
): Todo[] {
  let preperedTodos = [...todos];

  if (sortField === 'completed') {
    preperedTodos = todos.filter(todo => todo.completed);
  }

  if (sortField === 'active') {
    preperedTodos = todos.filter(todo => !todo.completed);
  }

  if (query) {
    preperedTodos = preperedTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return preperedTodos;
}

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [sortField, setSortField] = useState('all');
  const [query, setQuery] = useState('');

  const [loadingUser, setLoadingUser] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const visibleTodos = getVisibleTodos(todos, sortField, query);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(error => error.message)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      setLoadingUser(true);

      getUser(selectedTodo.userId)
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => setLoadingUser(false));
    }
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchValue={query}
                onSearchChange={setQuery}
                filterStatus={sortField}
                onFilterChange={setSortField}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          user={user}
          selectedTodo={selectedTodo}
          loadingUser={loadingUser}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
