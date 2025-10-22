import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
        setFilteredTodos(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let result = todos;

    if (statusFilter !== 'all') {
      const isCompleted = statusFilter === 'completed';

      result = result.filter(todo => todo.completed === isCompleted);
    }

    if (query) {
      const normalizedQuery = query.toLowerCase();

      result = result.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    setFilteredTodos(result);
  }, [todos, statusFilter, query]);

  const handleShowTodo = (todo: Todo) => {
    setSelectedTodoId(todo.id);
    setSelectedTodo(todo);
    setIsModalLoading(true);

    getUser(todo.userId)
      .then(user => {
        setSelectedUser(user);
        setIsModalLoading(false);
      })
      .catch(() => setIsModalLoading(false));
  };

  const handleCloseModal = () => {
    setSelectedTodoId(null);
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={statusFilter}
                onStatusFilter={handleStatusFilter}
                query={query}
                onQueryChange={handleQueryChange}
                onClearQuery={handleClearQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onShowTodo={handleShowTodo}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isLoading={isModalLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
