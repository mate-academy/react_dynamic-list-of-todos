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
  const [loadingTodos, setLoadingTodos] = useState(false);

  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState('');

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  // load todos
  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoadingTodos(false));
  }, []);

  // set selectedTodo when selectedId changes
  useEffect(() => {
    if (selectedId) {
      const todo = todos.find(t => t.id === selectedId) || null;

      setSelectedTodo(todo);

      if (todo) {
        setLoadingUser(true);
        getUser(todo.userId)
          .then(setUser)
          .finally(() => setLoadingUser(false));
      }
    } else {
      setSelectedTodo(null);
      setUser(null);
    }
  }, [selectedId, todos]);

  // filtering
  const filteredTodos = todos.filter(todo => {
    if (status === 'completed' && !todo.completed) {
      return false;
    }

    if (status === 'active' && todo.completed) {
      return false;
    }

    if (query && !todo.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                onStatusChange={setStatus}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {loadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedId={selectedId}
                  onSelect={id => setSelectedId(selectedId === id ? null : id)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          loading={loadingUser}
          onClose={() => setSelectedId(null)}
        />
      )}
    </>
  );
};
