/* eslint-disable max-len */
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
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosFromServer = await getTodos();
        setTodos(todosFromServer);
      } catch (error) {
        console.error('Error loading todos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    let result = todos;

    if (status === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (status === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(lowerQuery),
      );
    }

    setFilteredTodos(result);
  }, [todos, query, status]);

  const handleTodoSelect = async (todo: Todo) => {
    // Якщо клікаємо на вже обраний todo - закриваємо модалку
    if (selectedTodo?.id === todo.id) {
      setSelectedTodo(null);
      setSelectedUser(null);
      return;
    }

    setSelectedTodo(todo);
    setUserLoading(true);
    setSelectedUser(null);

    try {
      const user = await getUser(todo.userId);
      setSelectedUser(user);
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setUserLoading(false);
    }
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
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
                query={query}
                status={status}
                onQueryChange={handleQueryChange}
                onStatusChange={handleStatusChange}
                onClearQuery={handleClearQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onTodoSelect={handleTodoSelect}
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
          isLoading={userLoading}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};
