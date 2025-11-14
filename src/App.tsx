/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoadingTodos(true);
      const data = await getTodos();

      setTodos(data.filter(todo => todo.userId <= 5));
      setIsLoadingTodos(false);
    };

    loadTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    let result = [...todos];

    if (status === 'completed') {
      result = result.filter(todo => todo.completed);
    } else if (status === 'active') {
      result = result.filter(todo => !todo.completed);
    }

    if (query.trim()) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return result;
  }, [todos, status, query]);

  const openModal = async (todo: Todo | null) => {
    if (!todo) {
      setSelectedTodo(null);

      return;
    }

    setSelectedTodo(todo);
    setSelectedUser(null);
    setIsLoadingUser(true);

    const user = await getUser(todo.userId);

    setSelectedUser(user);
    setIsLoadingUser(false);
  };

  const closeModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
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
                query={query}
                onStatusChange={setStatus}
                onQueryChange={setQuery}
                onClearQuery={() => setQuery('')}
              />
            </div>

            <div className="block">
              {isLoadingTodos && <Loader />}

              {!isLoadingTodos && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelect={todo => {
                    if (todo) {
                      openModal(todo);
                    } else {
                      closeModal();
                    }
                  }}
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
          isLoading={isLoadingUser}
          onClose={closeModal}
        />
      )}
    </>
  );
};
