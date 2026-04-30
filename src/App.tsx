/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getTodos().then(response => {
      setTodos(() => response);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedTodo(null);
    }
  }, [isModalOpen]);

  const filteredTodos = useMemo(() => {
    let result = todos;

    if (status === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (status === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      result = result.filter(todo => todo.title.toLowerCase().includes(query));
    }

    return result;
  }, [todos, status, searchQuery]);

  const handleStatusChange = (newStatus: 'all' | 'active' | 'completed') => {
    setStatus(newStatus);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                searchQuery={searchQuery}
                onStatusChange={handleStatusChange}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setIsModalOpen={setIsModalOpen}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal
          setIsModalOpen={setIsModalOpen}
          selectedTodo={selectedTodo as Required<Todo> | null}
        />
      )}
    </>
  );
};
