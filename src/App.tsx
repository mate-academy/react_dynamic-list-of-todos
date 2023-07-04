/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState(FilterStatus.ALL);

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => {
        setTodos(todosFromServer);
        setIsLoading(false);
      })
      .catch((error) => {
        throw new Error('Loading todos error: ', error.message);
      });
  }, []);

  const visibleTodos = todos.filter((todo) => {
    const normalizedQuery = query.toLowerCase().trim();

    const normalizedTodo = todo.title
      .toLowerCase()
      .trim()
      .includes(normalizedQuery);

    switch (filterStatus) {
      case FilterStatus.ALL:
        return normalizedTodo;

      case FilterStatus.ACTIVE:
        return normalizedTodo && !todo.completed;

      case FilterStatus.COMPLETED:
        return normalizedTodo && todo.completed;

      default:
        throw new Error('Unknown status selector');
    }
  });

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
