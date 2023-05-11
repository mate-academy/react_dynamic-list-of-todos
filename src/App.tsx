/* eslint-disable max-len */
import React, { useState, useEffect, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterTodos, setFilterTodos] = useState('All');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const handleSelectingTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const handleQuery = useCallback((userQuery: string) => {
    setQuery(userQuery);
  }, []);

  const handlefilterTodos = useCallback((userFilter: string) => {
    setFilterTodos(userFilter);
  }, []);

  let visibleTodos = [...todos];

  if (filterTodos === 'active') {
    visibleTodos = visibleTodos.filter(({ completed }) => completed === false);
  }

  if (filterTodos === 'completed') {
    visibleTodos = visibleTodos.filter(({ completed }) => completed === true);
  }

  if (query) {
    visibleTodos = visibleTodos.filter(({ title }) => title.includes(query));
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterTodos={filterTodos}
                onQuery={handleQuery}
                onfilterTodos={handlefilterTodos}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodo?.id}
                    onSelectedTodo={handleSelectingTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
