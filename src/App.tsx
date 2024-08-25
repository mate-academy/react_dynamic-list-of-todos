/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const filteredTodos = todos
    .filter(({ completed }) => {
      switch (filter) {
        case Filter.Completed:
          return completed;
        case Filter.Active:
          return !completed;
        case Filter.All:
        default:
          return true;
      }
    })
    .filter(
      ({ title }) =>
        !query || title.toLowerCase().includes(query.toLowerCase()),
    );

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const handleEyeClick = (userId: number, todo: Todo) => {
    setSelectedUserId(userId);
    setSelectedTodo(todo);
  };

  const handleClose = () => {
    setSelectedUserId(null);
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
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  handleSelectTodo={handleEyeClick}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedUserId && selectedTodo && (
        <TodoModal
          userId={selectedUserId}
          todo={selectedTodo}
          onClose={handleClose}
        />
      )}
    </>
  );
};
