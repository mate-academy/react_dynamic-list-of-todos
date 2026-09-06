/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getUser } from './api';
import { User } from './types/User';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const closeModal = () => setSelectedTodo(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const visibleTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all'
        ? true
        : status === 'completed'
          ? todo.completed
          : !todo.completed;

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
      setIsLoadingModal(true);
      getUser(selectedTodo.userId).then(userData => {
        setUser(userData);
        setIsLoadingModal(false);
      });
    }
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onQueryChange={setQuery} onStatusChange={setStatus} />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelect={setSelectedTodo}
                  select={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          load={isLoadingModal}
          todo={selectedTodo}
          user={user}
          close={closeModal}
        />
      )}
    </>
  );
};
