import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Completed, Filters } from './types/Filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filters, setFilters] = useState<Filters>({
    completedType: Completed.All,
    searchByText: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const updateFilters = (key: keyof Filters, value: string | Completed) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(item => {
      const matchesCompletedType =
        filters.completedType === Completed.All ||
        (filters.completedType === Completed.Completed && item.completed) ||
        (filters.completedType === Completed.Active && !item.completed);

      const matchesSearchText = item.title
        .toLowerCase()
        .includes(filters.searchByText.toLowerCase());

      return matchesCompletedType && matchesSearchText;
    });
  }, [todos, filters]);

  useEffect(() => {
    getTodos()
      .then(todosData => {
        setTodos(todosData);
      })
      .catch(error => {
        setErrorMessage(`Failed to fetch todos: ${error.message}`);
      });
    }, []);

    return (
      <>
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              {errorMessage && (
                <p className="notification is-danger">{errorMessage}</p>
              )}

              <div className="block">
                <TodoFilter
                  filterOptions={filters}
                  onFilterChange={updateFilters}
                />
              </div>

              <div className="block">
                {todos.length === 0 ? (
                  <Loader />
                ) : (
                  <TodoList
                  todos={filteredTodos}
                  onSelectTodo={selectTodo}
                  activeTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          setModalOpen={() => selectTodo(null)}
          todo={selectedTodo}
          resetSelectedTodo={() => selectTodo(null)}
        />
      )}
    </>
  );
};
