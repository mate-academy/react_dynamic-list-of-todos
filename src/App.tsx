/* eslint-disable max-len */
import React, { useState, useEffect, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { getTodos } from './api';

const filteredTodos = (todos: Todo[], inputQuery: string, filterType: FilterType) => {
  let currentTodos = [...todos];

  if (inputQuery) {
    const query = inputQuery.trim().toLowerCase();

    currentTodos = currentTodos.filter(todo => todo.title.toLowerCase().includes(query));
  }

  switch (filterType) {
    case FilterType.ACTIVE:
      currentTodos = currentTodos.filter(todo => !todo.completed);
      break;
    case FilterType.COMPLETED:
      currentTodos = currentTodos.filter(todo => todo.completed);
      break;
    default:
      break;
  }

  return currentTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [query, setQuery] = useState<string>('');
  const [filterType, setFilterType] = useState(FilterType.ALL);

  const visibleTodos = filteredTodos(todos, query, filterType);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();

      setTodos(data);
      setIsDataLoading(false);
      setIsDataLoading(false);
    } catch {
      setIsLoadingError(true);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const openTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, [selectedTodo]);

  const closeTodo = useCallback(() => {
    setSelectedTodo(null);
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterType={filterType}
                onQueryChange={setQuery}
                onFilterTypeChange={setFilterType}
              />
            </div>

            <div className="block">
              {isDataLoading && <Loader />}
              {isLoadingError
                ? <p>Error of loading data</p>
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    openTodo={openTodo}
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
          closeTodo={closeTodo}
        />
      )}
    </>
  );
};
