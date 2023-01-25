/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadError, setIsLoadError] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [todosStatusFilter, setTodosStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setIsLoadError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();
      const normalizedQuery = searchQuery
        .toLowerCase()
        .split(' ')
        .filter(Boolean)
        .join(' ');

      const isTitleIncludesQuery = normalizedTitle.includes(normalizedQuery);

      switch (todosStatusFilter) {
        case 'active':
          return !todo.completed && isTitleIncludesQuery;

        case 'completed':
          return todo.completed && isTitleIncludesQuery;

        case 'all':
        default:
          return isTitleIncludesQuery;
      }
    });
  }, [todos, todosStatusFilter, searchQuery]);

  const selectedTodo = useMemo(() => {
    return visibleTodos.find(todo => (todo.id === selectedTodoId)) || null;
  }, [visibleTodos, selectedTodoId]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilter={todosStatusFilter}
                onFilterSelect={setTodosStatusFilter}
                query={searchQuery}
                onQueryChange={setSearchQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onTodoSelect={setSelectedTodoId}
                  selectedTodoId={selectedTodoId}
                />
              )}

              {isLoadError && (
                <p>We are unable to load todos now, try again later</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          selectedTodo={selectedTodo}
          onTodoClose={setSelectedTodoId}
        />
      )}
    </>
  );
};
