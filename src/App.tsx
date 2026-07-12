/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos, getUser } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoadingTodos(true);

      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } finally {
        setIsLoadingTodos(false);
      }
    };

    loadTodos();
  }, []);

  const handleSelectTodo = async (todo: Todo) => {
    if (selectedTodoId === todo.id) {
      setSelectedTodo(null);
      setSelectedTodoId(null);
      setUser(null);
      setIsLoadingUser(false);

      return;
    }

    setSelectedTodo(todo);
    setSelectedTodoId(todo.id);
    setUser(null);
    setIsLoadingUser(true);

    try {
      const loadedUser = await getUser(todo.userId);

      setUser(loadedUser);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const handleCloseTodo = () => {
    setSelectedTodo(null);
    setSelectedTodoId(null);
    setUser(null);
    setIsLoadingUser(false);
  };

  const filteredTodos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return todos.filter(todo => {
      const matchesStatus =
        status === 'all' ||
        (status === 'active' ? !todo.completed : todo.completed);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        todo.title.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [query, status, todos]);

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
                onQueryChange={setQuery}
                onStatusChange={setStatus}
                onClearQuery={() => setQuery('')}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                filteredTodos.length > 0 && (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodoId={selectedTodoId}
                    onSelectTodo={handleSelectTodo}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          isLoading={isLoadingUser}
          onClose={handleCloseTodo}
        />
      )}
    </>
  );
};
