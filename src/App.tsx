/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoStatus } from './types/todoStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorUserMessage, setErrorUserMessage] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User>();
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [filterByStatus, setFilterByStatus] = useState<TodoStatus>(
    TodoStatus.ALL,
  );
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Try again later'))
      .finally(() => setIsLoading(false));
  }, []);

  const getFilteredTodos = () => {
    let filteredTodos = [...todos];

    switch (filterByStatus) {
      case TodoStatus.ACTIVE:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case TodoStatus.COMPLETED:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (query.trim()) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filteredTodos;
  };

  const handleSelectedTodo = useCallback((todo: Todo) => {
    setIsUserLoading(true);
    setSelectedTodo(todo);
    getUser(todo.userId)
      .then(setUser)
      .catch(() => setErrorUserMessage('User is not found'))
      .finally(() => setIsUserLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterByStatus={setFilterByStatus}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={getFilteredTodos()}
                  onSelected={handleSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}

              {errorMessage && (
                <p className="has-text-danger">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
          user={user}
          errorUserMessage={errorUserMessage}
          isUserLoading={isUserLoading}
        />
      )}
    </>
  );
};
