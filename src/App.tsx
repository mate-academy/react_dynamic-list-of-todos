/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { Status, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState(Status.ALL);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => setTodos(todosFromServer))
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      const normalizedQuery = query.toLowerCase().trim();

      const normalizedTodo = todo.title
        .toLowerCase()
        .trim()
        .includes(normalizedQuery);

      switch (filterStatus) {
        case Status.ALL:
          return normalizedTodo;

        case Status.ACTIVE:
          return normalizedTodo && !todo.completed;

        case Status.COMPLETED:
          return normalizedTodo && todo.completed;

        default:
          throw new Error('Unknown status selector');
      }
    });
  }, [todos, query, filterStatus]);

  const handleInput = (value: string) => {
    setQuery(value);
  };

  const selectTodo = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    todo: Todo,
  ) => {
    event.preventDefault();
    setSelectedTodo(todo);
  };

  const handleCloseTodo = () => {
    setSelectedTodo(null);
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
        <TodoModal
          todo={selectedTodo}
          onClose={handleCloseTodo}
        />
      )}
    </>
  );
};
