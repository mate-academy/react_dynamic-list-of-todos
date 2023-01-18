/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const closeModal = useCallback(() => (
    setSelectedTodoId(0)
  ), []);

  const visibleTodos = todos.filter(todo => {
    const normalizedTitle = todo.title.toLowerCase();
    const normalizedQuery = query.toLowerCase().trim();
    const isQueryMatchTitle = normalizedTitle.includes(normalizedQuery);

    switch (filter) {
      case 'completed':
        return todo.completed && isQueryMatchTitle;

      case 'active':
        return !todo.completed && isQueryMatchTitle;

      case 'all':
      default:
        return todo && isQueryMatchTitle;
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
                filter={filter}
                query={query}
                onFilterChange={setFilter}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelectTodo={(id: number) => setSelectedTodoId(id)}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            onCloseModal={closeModal}
          />
        )}
    </>
  );
};
