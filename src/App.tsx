/* eslint-disable max-len */
import React, { useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);
  const [filter, setFilter] = React.useState<'all' | 'completed' | 'active'>(
    'all',
  );
  const [query, setQuery] = React.useState('');
  const [user, setUser] = React.useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = React.useState(false);

  // Фільтрування todos
  const filteredTodos = useMemo(() => {
    let filtered = todos;

    if (filter === 'completed') {
      filtered = filtered.filter(t => t.completed);
    } else if (filter === 'active') {
      filtered = filtered.filter(t => !t.completed);
    }

    if (query) {
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filtered;
  }, [todos, filter, query]);

  // Завантаження todos з API
  useEffect(() => {
    setIsLoading(true);
    fetch(
      'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json',
    )
      .then(res => res.json())
      .then((data: Todo[]) => setTodos(data))
      .finally(() => setIsLoading(false));
  }, []);

  // Завантаження user при виборі todo
  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setIsUserLoading(true);
    setUser(null);

    fetch(
      `https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${selectedTodo.userId}.json`,
    )
      .then(res => res.json())
      .then((data: User) => setUser(data))
      .finally(() => setIsUserLoading(false));
  }, [selectedTodo]);

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
                filter={filter}
                onFilterChange={setFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectTodo={todo => {
                    setUser(null); // очищаємо попереднього користувача
                    setIsUserLoading(true);
                    setSelectedTodo(todo); // вибираємо todo
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          isLoading={isUserLoading}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
