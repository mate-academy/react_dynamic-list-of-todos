/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
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
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'completed' | 'active'
  >('all');

  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let filtered = todos;

    if (statusFilter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (statusFilter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    if (query.trim()) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setVisibleTodos(filtered);
  }, [todos, statusFilter, query]);

  const handleSelectTodo = (todo: Todo) => {
    setIsLoading(true);
    setSelectedTodo(todo);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => setIsLoading(false));
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setUser(null);
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
                status={statusFilter}
                onStatusChange={setStatusFilter}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodoId={selectedTodo?.id ?? null}
                onShow={todo => {
                  if (selectedTodo?.id === todo.id) {
                    handleCloseModal(); // esconde o modal se clicar novamente
                  } else {
                    handleSelectTodo(todo);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal todo={selectedTodo} user={user} onClose={handleCloseModal} />
    </>
  );
};
