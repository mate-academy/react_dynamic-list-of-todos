/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getTodos } from './api';
import { TodosContext } from './TodosContext';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [activeFilter, setActiveFilter] = useState(Status.All);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => clearInterval(timerId);
  });

  const filteredTodos = todos.filter(todo => {
    switch (activeFilter) {
      case Status.All:
        return true;

      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      default:
        return true;
    }
  }).filter(todo => todo.title.toLowerCase().includes(debouncedQuery.toLowerCase()));

  const value = {
    todos: filteredTodos,
    selectedTodo,
    setSelectedTodo,
    setActiveFilter,
    query,
    setQuery,
  };

  return (
    <TodosContext.Provider value={value}>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {!isLoading && todos.length > 0 && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </TodosContext.Provider>
  );
};
