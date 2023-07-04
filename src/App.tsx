/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { StatusFilter } from './helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState(StatusFilter.ALL);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .finally(() => setIsLoading(false))
      .catch(error => new Error(`Error - todos was not loaded:', ${error}`));
  }, []);

  const handleStatus = useCallback((selectedStatus: StatusFilter) => {
    setStatus(selectedStatus);
  }, []);

  const handleQuery = useCallback((search: string) => {
    setQuery(search);
  }, []);

  const handleTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const clearSelectedTodo = () => {
    setSelectedTodo(null);
  };

  const visibleTodos = todos.filter(todo => {
    const normalizedTodo
    = todo.title.toLowerCase().trim().includes(query.toLowerCase());

    switch (status) {
      case StatusFilter.ALL:
        return normalizedTodo;
      case StatusFilter.ACTIVE:
        return normalizedTodo && !todo.completed;
      case StatusFilter.COMPLETED:
        return normalizedTodo && todo.completed;
      default:
        throw new Error('Unknown status selector');
    }
  });

  const clearQuery = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                handleStatus={handleStatus}
                handleQuery={handleQuery}
                clearQuery={clearQuery}
              />
            </div>

            <div className="block">
              {!isLoading ? (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  handleTodo={handleTodo}
                />
              ) : (
                <Loader />
              )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClear={clearSelectedTodo}
        />
      )}
    </>
  );
};
