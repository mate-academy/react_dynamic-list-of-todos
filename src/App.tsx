/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState(Status.ALL);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(error => {
        throw new Error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const goodTodo = todo.title.toLowerCase().trim().includes(
        query.toLowerCase().trim(),
      );

      switch (filterStatus) {
        case Status.ALL:
          return goodTodo;

        case Status.ACTIVE:
          return goodTodo && !todo.completed;

        case Status.COMPLETED:
          return goodTodo && todo.completed;

        default:
          throw new Error('Incorrect status');
      }
    });
  }, [todos, filterStatus, query]);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleCloseTodo = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterStatus={setFilterStatus}
                query={query}
                setQuery={setQuery}
              />
              {selectedTodo?.id}
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <>
                    {todos.length > 0 ? (
                      <TodoList
                        todos={visibleTodos}
                        selectedTodo={selectedTodo}
                        setSelectedTodo={setSelectedTodo}
                      />
                    ) : (
                      <p>No todos</p>
                    )}
                  </>
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseTodo} />
      )}
    </>
  );
};
