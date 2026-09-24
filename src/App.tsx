/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [isUserLoading, setIsUserLoading] = useState(false);

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    return matchesStatus && matchesQuery;
  });

  useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      setIsUserLoading(true);

      getUser(selectedTodo.userId).then(user => {
        setSelectedUser(user);
        setIsUserLoading(false);
      });
    }
  }, [selectedTodo?.userId, selectedTodo]);

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
                status={status}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={filteredTodos}
                onClick={todo => {
                  setSelectedTodo(todo);
                  setIsOpenModal(true);
                  setIsUserLoading(true);
                }}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {isOpenModal && selectedTodo && (
        <TodoModal
          user={selectedUser}
          todo={selectedTodo}
          isLoading={isUserLoading}
          onClick={() => {
            setIsOpenModal(false);
            setSelectedTodo(null);
            setSelectedUser(null);
            setIsUserLoading(false);
          }}
        />
      )}
    </>
  );
};
