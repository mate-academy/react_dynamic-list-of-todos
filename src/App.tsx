import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [status, setStatus] = useState('all');
  const [loadingUser, setLoadingUser] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos().then(data => {
      setTodos(data);
      setLoading(false);
    });
  }, []);

  const filterTodos = () => {
    return todos.filter(todo => {
      const matchesStatus =
        status === 'all' ||
        (status === 'completed' ? todo.completed : !todo.completed);
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });
  };

  const handleShow = (todo: Todo) => {
    setLoadingUser(true);
    setSelectedTodo(todo);
    getUser(todo.userId).then(user => {
      setSelectedUser(user);
      setLoadingUser(false);
    });
  };

  const handleClose = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                query={query}
                setStatus={setStatus}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={filterTodos()}
                  onShow={handleShow}
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
          onClose={handleClose}
          loadingUser={loadingUser}
        />
      )}
    </>
  );
};
