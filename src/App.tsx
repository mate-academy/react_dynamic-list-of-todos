/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getTodos().then((result) => setVisibleTodos(result));
  }, []);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleModalChange = () => {
    setSelectedTodo(null);
  };

  const handleTodoChange = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const filteredTodos = visibleTodos
    .filter(({ title }) => title.toLowerCase().includes(query.toLowerCase()))
    .filter(({ completed }) => {
      switch (filter) {
        case 'all':
          return true;
        case 'active':
          return !completed;
        case 'completed':
          return completed;
        default:
          return false;
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
                query={query}
                setQuery={handleQueryChange}
                filter={filter}
                setFilter={handleFilterChange}
              />
            </div>

            <div className="block">
              {visibleTodos.length === 0
                ? (
                  <Loader />
                )
                : (
                  <TodoList
                    visibleTodos={filteredTodos}
                    setSelectedTodo={handleTodoChange}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={handleModalChange}
        />
      )}
    </>
  );
};
