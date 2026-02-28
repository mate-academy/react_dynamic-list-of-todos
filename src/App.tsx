/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter, StatusFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);

  const [status, setStatus] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    let isActive = true;

    setIsLoadingTodos(true);

    getTodos()
      .then(loadedTodos => {
        if (isActive) {
          setTodos(loadedTodos);
        }
      })
      .catch(() => {
        if (isActive) {
          setTodos([]);
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoadingTodos(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const filteredTodos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return todos
      .filter(todo => {
        if (status === 'completed') {
          return todo.completed;
        }

        if (status === 'active') {
          return !todo.completed;
        }

        return true;
      })
      .filter(todo => todo.title.toLowerCase().includes(normalizedQuery));
  }, [todos, status, query]);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const handleClearQuery = () => {
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
                status={status}
                query={query}
                onStatusChange={setStatus}
                onQueryChange={setQuery}
                onQueryClear={handleClearQuery}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id ?? null}
                  onSelectTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
