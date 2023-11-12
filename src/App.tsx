/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

enum FilterValue {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

function getPreparedTodos(todos: Todo[], query: string, filterValue: FilterValue) {
  return todos.filter(todo => {
    switch (filterValue) {
      case FilterValue.Completed:
        return todo.completed === true;
      case FilterValue.Active:
        return todo.completed === false;
      case FilterValue.All:
        return true;
      default:
        return false;
    }
  }).filter(todo => {
    if (query) {
      const prepQuery = query.trim().toLowerCase();

      return todo.title.toLowerCase().includes(prepQuery);
    }

    return true;
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterValue, setFilterValue] = useState(FilterValue.All);
  const visibleTodos = getPreparedTodos(todos, query, filterValue);

  const handleOpenModal = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleQueryDelete = () => {
    setQuery('');
  };

  const handleFilterCompleted = () => {
    setFilterValue(FilterValue.Completed);
  };

  const handleFilterActive = () => {
    setFilterValue(FilterValue.Active);
  };

  const handleFilterAll = () => {
    setFilterValue(FilterValue.All);
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getTodos().then((data) => {
        setIsLoading(false);
        setTodos(data);
      });
    }, 500);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleQueryChange={handleQueryChange}
                query={query}
                handleQueryDelete={handleQueryDelete}
                handleFilterCompleted={handleFilterCompleted}
                handleFilterActive={handleFilterActive}
                handleFilterAll={handleFilterAll}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : <TodoList todos={visibleTodos} handleOpenModal={handleOpenModal} selectedTodo={selectedTodo} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && !isLoading && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
