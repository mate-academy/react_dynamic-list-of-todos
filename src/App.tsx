/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos, getUser } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type User = {
  name: string;
  email: string;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'completed' | 'active'>('all');

  const [loadingTodos, setLoadingTodos] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  const loadTodos = async () => {
    try {
      setLoadingTodos(true);
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } finally {
      setLoadingTodos(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleTodoSelect = async (todo: Todo) => {
    try {
      setSelectedTodo(todo);
      setLoadingUser(true);
      const userFromServer = await getUser(todo.userId);

      setUser(userFromServer);
    } finally {
      setLoadingUser(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setUser(null);
  };

  const visibleTodos = useMemo(() => {
    return todos
      .filter(todo => {
        switch (status) {
          case 'completed':
            return todo.completed;

          case 'active':
            return !todo.completed;

          default:
            return true;
        }
      })
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  }, [todos, status, query]);

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
              {(loadingTodos || loadingUser) && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodo={selectedTodo}
                onSelectTodo={handleTodoSelect}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          loading={loadingUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
