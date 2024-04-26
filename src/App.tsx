/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList/index';
import { StatusFilter, TodoFilter } from './components/TodoFilter/index';
import { TodoModal } from './components/TodoModal/index';
import { Loader } from './components/Loader/index';

import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [query, setQuery] = useState<string | null>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError(true));
  }, []);

  const filteredTodos = useMemo(() => {
    if (!todos) {
      return null;
    }

    let newFilteredTodos = [];

    const includesQuery = (todo: Todo) =>
      query
        ? todo.title.toLowerCase().includes(query.trim().toLowerCase())
        : true;

    switch (statusFilter) {
      case 'active':
        newFilteredTodos = todos.filter(t => !t.completed && includesQuery(t));
        break;

      case 'completed':
        newFilteredTodos = todos.filter(t => t.completed && includesQuery(t));
        break;

      case 'all':
      default:
        newFilteredTodos = todos.filter(t => includesQuery(t));
    }

    return newFilteredTodos;
  }, [todos, statusFilter, query]);

  const selectedTodo = useMemo(() => {
    if (filteredTodos && selectedTodoId) {
      return filteredTodos.find(todo => todo.id === selectedTodoId);
    }

    return null;
  }, [selectedTodoId, filteredTodos]);

  const handleSelectTodo = (id: number | null) => setSelectedTodoId(id);

  const handleCloseModal = () => setSelectedTodoId(null);

  const handleStatusFilterChange = (status: StatusFilter) =>
    setStatusFilter(status);
  
  const handleSearchQueryChange = (newQuery: string) => setQuery(newQuery);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSearch={handleSearchQueryChange}
                onSelectFilter={handleStatusFilterChange}
              />
            </div>

            <div className="block">
              {filteredTodos ? (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId}
                  onSelect={handleSelectTodo}
                />
              ) : ( error
                ? (
                  <p>Something went wrong!</p>
                ) : (
                  <Loader />
                )
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
