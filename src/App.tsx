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
import { selectTodos } from './utils/selecting';
import { filterTodo } from './utils/filtering';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleStatusChange = (select: string) => {
    setStatusFilter(select);
  };

  const handleSearchChange = (query: string) => {
    setInputValue(query);
  };

  const handleSelectTodo = (todo: Todo) => {
    setActiveTodo(todo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveTodo(null);
  };

  const handleClearSearch = () => {
    setInputValue('');
  };

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setInitialTodos(todosFromServer);
      })
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = selectTodos(initialTodos, statusFilter);

  const filteredTodos = inputValue.trim()
    ? filterTodo(visibleTodos, inputValue.toLowerCase().trim())
    : visibleTodos;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={handleStatusChange}
                onInput={handleSearchChange}
                onClearInput={handleClearSearch}
                value={inputValue}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  onSelect={handleSelectTodo}
                  activeTodo={activeTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal activeTodo={activeTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
