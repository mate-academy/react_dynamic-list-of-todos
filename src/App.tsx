/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilterStatus } from './types/FilterStatus';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(FilterStatus.ALL);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteringTodos: Todo[] = useMemo(() => {
    let filteredTodos = [...todos];

    if (query) {
      const normalizeQuery = query.trim().toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.title.toLowerCase().includes(normalizeQuery));
    }

    switch (selectedStatus) {
      case FilterStatus.ACTIVE:
        return filteredTodos.filter(todo => todo.completed === false);
        break;
      case FilterStatus.COMPLITED:
        return filteredTodos.filter(todo => todo.completed === true);
        break;

      default:
        return filteredTodos;
    }
  }, [todos, query, selectedStatus]);

  const handelCloseModal = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    setIsLoading(true);

    setInterval(() => {
      getTodos()
        .then(setTodos)
        .finally(() => setIsLoading(false));
    }, 1000);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}

              {!isLoading && (
                <TodoList
                  todos={filteringTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          handelCloseModal={handelCloseModal}
        />
      )}
    </>
  );
};
