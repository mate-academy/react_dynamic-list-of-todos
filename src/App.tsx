import React, { useEffect, useState, useCallback, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export type StatusSelect = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [status, setStatus] = useState<StatusSelect>('all');
  const [query, setQuery] = useState('');

  const handleShowTodoModal = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const handleCloseTodoModal = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');
    getTodos()
      .then(setTodosFromServer)
      .catch(e => setErrorMessage(e.message || 'Something went wrong!'))
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    let filteredTodos = todosFromServer;

    if (status === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }

    if (status === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    if (query) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filteredTodos;
  }, [todosFromServer, status, query]);

  const isTodoListNotEmpty =
    !isLoading && !errorMessage && visibleTodos.length > 0;
  const isNoTodos = !isLoading && !errorMessage && visibleTodos.length === 0;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onStatusSelect={setStatus}
                onQueryChange={setQuery}
                status={status}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && errorMessage && (
                <div className="notification is-danger">{errorMessage}</div>
              )}
              {isNoTodos && (
                <div className="notification is-danger is-light">
                  There are no todos.
                </div>
              )}
              {isTodoListNotEmpty && (
                <TodoList
                  selectedTodo={selectedTodo}
                  todos={visibleTodos}
                  onShowTodo={handleShowTodoModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onModalClose={handleCloseTodoModal} />
      )}
    </>
  );
};
