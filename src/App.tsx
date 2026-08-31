/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      setUserLoading(true);

      getUser(selectedTodo.userId)
        .then(setSelectedUser)
        .finally(() => setUserLoading(false));
    }
  }, [selectedTodo]);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  const visibleTodos = todos.filter(todo => {
    if (status === 'active' && todo.completed) {
      return false;
    }

    if (status === 'completed' && !todo.completed) {
      return false;
    }

    return todo.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setStatus={setStatus}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loading === true && <Loader />}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  onSelectTodo={handleSelectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          selectedTodo={selectedTodo}
          selectedUser={selectedUser}
          onCloseTodo={handleCloseModal}
          userLoading={userLoading}
        />
      )}
    </>
  );
};
