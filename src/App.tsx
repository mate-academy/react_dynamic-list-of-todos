/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { CompletedFilter } from './types/CompletedFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedFilter, setCompletedFilter] = useState<CompletedFilter>('all');
  const [query, setQuery] = useState('');
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const handleCompletedFilter = (complete: CompletedFilter): void => {
    setCompletedFilter(complete);
  };

  const handleSearchQuery = (newQuery: string): void => {
    setQuery(newQuery);
  };

  const handleChooseTodoEye = (todo: Todo): void => {
    setCurrentTodo(todo);
  };

  const handleCloseChoosenTodo = () => {
    setCurrentTodo(null);
  };

  const visibleTodos = todos.filter(todo => {
    if (!todo.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    switch (completedFilter) {
      case 'completed':
        return todo.completed;

      case 'active':
        return !todo.completed;

      default:
        return true;
    }
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleCompletedFilter={handleCompletedFilter}
                handleSearchQuery={handleSearchQuery}
                query={query}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    choosenId={currentTodo?.id || null}
                    handleChooseTodoEye={handleChooseTodoEye}
                  />
                )}

            </div>
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal
          handleCloseChoosenTodo={handleCloseChoosenTodo}
          todo={currentTodo}
        />
      )}
    </>
  );
};
