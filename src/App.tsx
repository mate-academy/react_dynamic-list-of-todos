/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState(FilterType.ALL);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => setTodos(todosFromServer))
      .catch((error) => {
        throw new Error(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    let prepareTodos = [...todos];

    if (query.trim()) {
      prepareTodos = prepareTodos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    switch (filterStatus) {
      case FilterType.ALL:
        return prepareTodos;

      case FilterType.COMPLETED:
        return prepareTodos.filter(todo => todo.completed);

      case FilterType.ACTIVE:
        return prepareTodos.filter(todo => !todo.completed);

      default:
        return prepareTodos;
    }
  }, [todos, query, filterStatus]);

  const selectTodo = (
    todo: Todo,
  ) => {
    setSelectedTodo(todo);
  };

  const handleCloseTodo = () => {
    setSelectedTodo(null);
  };

  const handleInput = (value: string) => {
    setQuery(value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                handleInput={handleInput}
                setFilterStatus={setFilterStatus}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelectTodo={selectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseTodo} />
      )}
    </>
  );
};
