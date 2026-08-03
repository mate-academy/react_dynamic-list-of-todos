/* eslint-disable max-len */
import React, { useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { TodoFilterType } from './types/TodoFilter';

import { useVisibleTodos } from './hooks/useVisibleTodos';
import { useTodos } from './hooks/useTodos';
import { useUser } from './hooks/useUser';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { ErrorModal } from './components/ErrorModal';

export const App: React.FC = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todoFilter, setTodoFilter] = useState<TodoFilterType>('all');
  const [query, setQuery] = useState('');

  const { todos, isLoading, todosErrorMessage, resetTodosError, loadTodos } =
    useTodos();
  const {
    user: selectedUser,
    isUserLoading,
    userErrorMessage,
  } = useUser(selectedTodo);
  const visibleTodos = useVisibleTodos(todos, todoFilter, query);

  const handleSelectTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const handleCloseModalTodo = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const handleClearSearch = useCallback(() => {
    setQuery('');
  }, []);

  /* eslint-disable no-console */
  console.log('---');
  console.log('App render');

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={todoFilter}
                onFilterChange={setTodoFilter}
                query={query}
                onQueryChange={setQuery}
                onClearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodoId={selectedTodo?.id}
                onSelectTodo={handleSelectTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isLoading={isUserLoading}
          onClose={handleCloseModalTodo}
        />
      )}

      {userErrorMessage && (
        <ErrorModal error={userErrorMessage} onClose={handleCloseModalTodo} />
      )}

      {todosErrorMessage && (
        <ErrorModal
          error={todosErrorMessage}
          onClose={resetTodosError}
          onReload={loadTodos}
        />
      )}
    </>
  );
};
