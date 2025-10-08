import React, { useState, useEffect, useRef } from 'react';
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
  // prettier-ignore
  const [filterStatus, setFilterStatus] = useState<
  'all' | 'completed' | 'active'
  >('all');
  const [query, setQuery] = useState('');
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Ref para controlar cancelamento de fetch de usuário
  const cancelFetchUser = useRef(false);

  // Fetch todos
  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(data => setTodos(data))
      .finally(() => setLoadingTodos(false));
  }, []);

  // Filter todos
  useEffect(() => {
    let result = [...todos];

    if (filterStatus === 'completed') {
      result = result.filter(t => t.completed);
    }

    if (filterStatus === 'active') {
      result = result.filter(t => !t.completed);
    }

    if (query) {
      result = result.filter(t =>
        t.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setFilteredTodos(result);
  }, [todos, filterStatus, query]);

  const showTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setLoadingUser(true);

    cancelFetchUser.current = false; // reset flag

    getUser(todo.userId)
      .then(data => {
        if (!cancelFetchUser.current) {
          setUser(data);
        }
      })
      .finally(() => {
        if (!cancelFetchUser.current) {
          setLoadingUser(false);
        }
      });
  };

  const closeModal = () => {
    // Sinaliza para ignorar resultados de fetch pendentes
    cancelFetchUser.current = true;

    setSelectedTodo(null);
    setUser(null);
    setLoadingUser(false);
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
                onClearQuery={() => setQuery('')}
                filterStatus={filterStatus}
                onFilterChange={setFilterStatus}
              />
            </div>

            <div className="block">
              {loadingTodos ? (
                <Loader />
              ) : (
                <TodoList todos={filteredTodos} onShow={showTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          loadingUser={loadingUser}
          onClose={closeModal}
        />
      )}
    </>
  );
};
