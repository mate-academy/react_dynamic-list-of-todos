/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setError(null);
    setIsLoadingTodos(true);
    getTodos()
      .then((data: Todo[]) => setTodos(data))
      .catch(() => {
        setError('Failed to load to-do list. Please try again later.');
      })
      .finally(() => setIsLoadingTodos(false));
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Filter;

    setFilter(value);
  };

  const handleTodoSelect = (todo: Todo) => {
    setSelectTodo(prev => (prev?.id === todo.id ? null : todo));
  };

  const filteredTodos = todos
    .filter(todo => {
      switch (filter) {
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        case 'all':
        default:
          return true;
      }
    })
    .filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();
      const normalizedQuery = query.trim().toLowerCase();

      return normalizedTitle.includes(normalizedQuery);
    });

  if (error) {
    return (
      <div className="section has-text-centered">
        <div className="notification is-danger">
          <p className="title is-4">Downloading Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (isLoadingTodos) {
    return <Loader />;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                onFilterChange={handleFilterChange}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              <TodoList
                todos={filteredTodos}
                selectedId={selectTodo?.id}
                onTodoSelect={handleTodoSelect}
              />
            </div>
          </div>
        </div>
      </div>

      {selectTodo && (
        <TodoModal todo={selectTodo} onSelectTodo={setSelectTodo} />
      )}
    </>
  );
};
