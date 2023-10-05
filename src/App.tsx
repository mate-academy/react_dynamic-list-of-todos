/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isloading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState(Filter.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('There are no todos'))
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

  const filtredTodos: Todo[] = useMemo(() => {
    let filtered = todos;

    switch (filterStatus) {
      case Filter.Active:
        filtered = filtered.filter(todo => !todo.completed);
        break;

      case Filter.Completed:
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
  }, [todos, filterStatus, query]);

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
                filterStatus={filterStatus}
                onFilterChange={setFilterStatus}
              />
            </div>

            <div className="block">
              {isloading && !selectedTodo
                ? <Loader />

                : (
                  <TodoList
                    todos={filtredTodos}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>

            {errorMessage && (
              <div className="notification is-danger">
                {errorMessage}
              </div>
            )}
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
