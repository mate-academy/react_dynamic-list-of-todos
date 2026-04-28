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
  const [loading, setLoading] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  // ✅ PRIMEIRO: função
  const loadTodos = async () => {
    setLoading(true);

    try {
      const data = await getTodos();

      setTodos(data);
    } finally {
      setLoading(false);
    }
  };

  // ✅ DEPOIS: useEffect
  useEffect(() => {
    loadTodos();
  }, []);
  const handleShow = async (todo: Todo) => {
    setSelectedTodo(todo);
    setLoading(true);

    try {
      const userData = await getUser(todo.userId);

      setUser(userData);
    } finally {
      setLoading(false);
    }
  };

  const visibleTodos = todos
    .filter(todo => {
      if (status === 'completed') {
        return todo.completed;
      }

      if (status === 'active') {
        return !todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              <TodoList
                todos={visibleTodos}
                onShow={handleShow}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          onClose={() => {
            setSelectedTodo(null);
            setUser(null);
          }}
        />
      )}
    </>
  );
};
