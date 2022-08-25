/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((todo) => {
        setTodos(todo);
        setIsLoading(false);
      });
  }, []);

  const getQuery = useCallback((newQuery) => {
    setQuery(newQuery);
  }, [setQuery]);

  const handleSelect = useCallback((todoId: number) => {
    setSelectedTodoId(todoId);
  }, [setSelectedTodoId]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSearch={getQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {todos.length > 0
                && (
                  <TodoList
                    todos={todos}
                    selectedTodoId={selectedTodoId}
                    onSelect={handleSelect}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId
        && (
          <TodoModal
            todos={todos}
            selectedTodoId={selectedTodoId}
          />
        )}
    </>
  );
};
