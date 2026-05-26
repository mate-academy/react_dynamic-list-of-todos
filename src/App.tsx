import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
      setLoading(false);
    });
  }, []);

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    const matchesStatus =
      status === 'all'
        ? true
        : status === 'active'
          ? !todo.completed
          : todo.completed;

    return matchesQuery && matchesStatus;
  });

  const openTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setUser(null);
    setUserLoading(true);

    getUser(todo.userId).then(data => {
      setUser(data);
      setUserLoading(false);
    });
  };

  const closeModal = () => {
    setSelectedTodo(null);
    setUser(null);
  };

  return (
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
            {loading ? (
              <Loader />
            ) : (
              <TodoList
                todos={filteredTodos}
                onSelect={openTodo}
                selectedTodoId={selectedTodo?.id}
              />
            )}
          </div>

          {selectedTodo && (
            <TodoModal
              isLoading={userLoading}
              todo={selectedTodo}
              user={user}
              onClose={closeModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};
