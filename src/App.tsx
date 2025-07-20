/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [modalUser, setModalUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState('');

  const handleSelect = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsUserLoading(true);

    getUser(todo.userId)
      .then(setModalUser)
      .finally(() => setIsUserLoading(false));
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = todos
    .filter(todo => {
      if (status === 'active') {
        return !todo.completed;
      }

      if (status === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => {
      return todo.title.toLowerCase().includes(query.trim().toLowerCase());
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
                setStatus={setStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : visibleTodos.length === 0 ? (
                <p className="has-text-grey">No todos found</p>
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo ? selectedTodo.id : null}
                  onSelect={handleSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={modalUser}
          isLoading={isUserLoading || !modalUser}
          onClose={() => {
            setSelectedTodo(null);
            setModalUser(null);
          }}
        />
      )}
    </>
  );
};
