/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos } from './api';
import { getUser } from './api';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(result => {
        setTodos(result);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setSelectedUser(null);
    setIsUserLoading(true);

    getUser(todo.userId)
      .then(userFromServer => {
        setSelectedUser(userFromServer);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  let filteredTodos = todos;

  if (status === 'completed') {
    filteredTodos = filteredTodos.filter(todo => todo.completed);
  }

  if (status === 'active') {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  }

  filteredTodos = filteredTodos.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );

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
                setQuery={setQuery}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={filteredTodos}
                onSelect={handleSelectTodo}
                activeTodoId={selectedTodo?.id ?? null}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isLoading={isUserLoading}
          onClose={() => {
            setSelectedTodo(null);
            setSelectedUser(null);
          }}
        />
      )}
    </>
  );
};
