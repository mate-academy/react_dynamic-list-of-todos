/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterType } from './types/FilterTypes';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [filterType, setFilterType] = useState(FilterType.All);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const data = await getTodos();

        setTodos(data);
        setIsLoading(false);
      } catch {
        setError(true);
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleSelectTodo = (id: number) => {
    setSelectedTodoId(id);
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFilterTypeChange = (type: FilterType) => {
    setFilterType(type);
  };

  const filteredTodos = useMemo(() => {
    if (query.length === 0 && filterType === FilterType.All) {
      return todos;
    }

    return todos.filter(({ title, completed }) => {
      const lowerCaseTitle = title.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();

      switch (filterType) {
        case FilterType.Completed:
          return completed && lowerCaseTitle.includes(lowerCaseQuery);

        case FilterType.Active:
          return !completed && lowerCaseTitle.includes(lowerCaseQuery);

        case FilterType.All:
        default:
          return lowerCaseTitle.includes(lowerCaseQuery);
      }
    });
  }, [todos, filterType, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterType={filterType}
                query={query}
                onClear={handleClearQuery}
                onChange={handleQueryChange}
                onChangeFilterType={handleFilterTypeChange}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  todoId={selectedTodoId}
                  onSelectTodo={handleSelectTodo}
                  onSelectUser={handleSelectUser}
                />
              )}

              {error && (
                <div className="error" style={{ color: 'red', textAlign: 'center' }}>
                  Failed to fetch data. Please try again later.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodoId > 0 && (
        <TodoModal
          todos={todos}
          userId={selectedUserId}
          todoId={selectedTodoId}
          onSelectTodo={handleSelectTodo}
          onSelectUser={handleSelectUser}
        />
      )}
    </>
  );
};
