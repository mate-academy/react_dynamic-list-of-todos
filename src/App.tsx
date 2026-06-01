/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState(null);

  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  const loadTodos = async () => {
    setLoading(true);

    const todosFromServer = await getTodos();

    setTodos(todosFromServer);

    setLoading(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleSelectTodo = async (todo: Todo) => {
    setSelectedTodo(todo);

    setUserLoading(true);

    const userFromServer = await getUser(todo.userId);

    setUser(userFromServer);

    setUserLoading(false);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setUser(null);
  };

  let filteredTodos = [...todos];

  filteredTodos = filteredTodos.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  if (status === 'active') {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  }

  if (status === 'completed') {
    filteredTodos = filteredTodos.filter(todo => todo.completed);
  }

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
                onQueryChange={setQuery}
                onStatusChange={setStatus}
                onClear={() => setQuery('')}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                selectedTodo={selectedTodo}
                onSelect={handleSelectTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          loading={userLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
