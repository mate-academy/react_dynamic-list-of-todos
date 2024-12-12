/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const data = await getTodos();

        setTodos(data);
      } catch (error) {
        // eslint-disable-next-line
        console.error('error fetching todos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleSelectTodo = async (todo: Todo) => {
    setSelectedTodo(todo);
    setIsLoading(true);
    try {
      const userData = await getUser(todo.userId);

      setUser(userData);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error fetching user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setUser(null);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const getFilteredTodos = () => {
    let filtered = [...todos];

    if (statusFilter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (statusFilter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();

      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query),
      );
    }

    return filtered;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onStatusChange={handleStatusChange}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
                searchQuery={searchQuery}
                statusFilter={statusFilter}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              <TodoList
                todos={getFilteredTodos()}
                onSelectTodo={handleSelectTodo}
                selectedTodoId={selectedTodo?.id}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          isLoading={isLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
