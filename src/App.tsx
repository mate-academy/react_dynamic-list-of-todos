import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [statusFilter, setStatusFilter] = useState('all');
  const [query, setQuery] = useState('');

  // ref para controlar solicitações de usuário
  const userRequestRef = useRef(0);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'completed' && todo.completed) ||
        (statusFilter === 'active' && !todo.completed);

      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });
  }, [todos, statusFilter, query]);

  const handleSelectTodo = (todo: Todo) => {
    // invalida qualquer fetch anterior
    userRequestRef.current += 1;
    const thisRequestId = userRequestRef.current;

    setSelectedTodo(todo);
    setSelectedUser(null);
    setIsUserLoading(true);

    getUser(todo.userId)
      .then(user => {
        // só atualiza se for a requisição corrente
        if (userRequestRef.current === thisRequestId) {
          setSelectedUser(user);
          setIsUserLoading(false);
        }
      })
      .catch(() => {
        if (userRequestRef.current === thisRequestId) {
          setIsUserLoading(false);
        }
      });
  };

  const handleCloseModal = () => {
    // invalida qualquer fetch pendente
    userRequestRef.current += 1;

    setSelectedTodo(null);
    setSelectedUser(null);
    setIsUserLoading(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={statusFilter}
                onStatusChange={setStatusFilter}
                query={query}
                onQueryChange={setQuery}
                onClearQuery={() => setQuery('')}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelect={handleSelectTodo}
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
          isLoading={isUserLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
