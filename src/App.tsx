import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      setUserLoading(true);
      getUser(selectedTodo.userId)
        .then(setUser)
        .finally(() => setUserLoading(false));
    } else {
      setUser(null);
    }
  }, [selectedTodo]);

  const filteredTodos = useMemo(() => {
    return todos
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
  }, [todos, status, query]);

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
                onClearQuery={() => setQuery('')}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelect={setSelectedTodo}
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
          user={user}
          loading={userLoading}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
