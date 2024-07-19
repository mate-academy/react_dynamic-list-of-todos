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
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [status, setStatus] = useState('all');
  const [loadingUser, setLoadingUser] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos().then(data => {
      setTodos(data);
      setFilteredTodos(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    filterTodos();
  }, [status, query, todos]);

  const filterTodos = () => {
    let result = todos;

    if (status !== 'all') {
      result = result.filter(todo =>
        status === 'completed' ? todo.completed : !todo.completed,
      );
    }

    if (query) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setFilteredTodos(result);
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
                  todos={filteredTodos}
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
