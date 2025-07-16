/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { User } from './types/User';

import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoadingTodos(true);
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsLoadingTodos(false);
    };

    loadTodos();
  }, []);

  useEffect(() => {
    let filtered = todos;

    if (query.trim()) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (status === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (status === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    setVisibleTodos(filtered);
  }, [todos, query, status]);

  const handleSelectedTodo = async (todo: Todo) => {
    setSelectedTodo(todo);
    setSelectedUser(null);
    setIsLoadingUser(true);

    try {
      const user = await getUser(todo.userId);

      setSelectedUser(user);
    } catch (error) {
      //eslint-disable-next-line no-console
      console.error('Failed to load user:', error);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
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
                onQueryChange={setQuery}
                onClearQuery={handleClearQuery}
                status={status}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelect={handleSelectedTodo}
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
          user={selectedUser}
          onClose={handleCloseModal}
          isLoading={isLoadingUser}
        />
      )}
    </>
  );
};
