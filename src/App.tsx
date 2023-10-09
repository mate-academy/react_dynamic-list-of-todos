import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';
import { TodoStatus } from './types/enum';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterParam, setFilterParam] = useState<TodoStatus>(TodoStatus.All);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.warn(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      setIsLoading(true);
      getUser(selectedTodo.userId)
        .then(setUser)
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn(error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedTodo]);

  const filteredTodos = useMemo(() => {
    let filtered = todos;

    switch (filterParam) {
      case TodoStatus.Active:
        filtered = filtered.filter(todo => !todo.completed);
        break;

      case TodoStatus.Completed:
        filtered = filtered.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    if (query.trim()) {
      filtered = filtered.filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filtered;
  }, [todos, filterParam, query]);

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
                filterParam={filterParam}
                onFilterChange={setFilterParam}
              />
            </div>

            <div className="block">
              {isLoading && !selectedTodo
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
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
          setSelectedTodo={setSelectedTodo}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
