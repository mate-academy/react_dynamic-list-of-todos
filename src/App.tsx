/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useState } from 'react';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (showModal) {
      setModalLoading(true);
      getUser(currentTodo?.userId || 0).then(user => {
        setModalLoading(false);
        setCurrentUser(user);
      });
    } else {
      setModalLoading(false);
      setCurrentUser(null);
    }
  }, [showModal, currentTodo]);

  function prepareTodos(todosFromServer: Todo[]): Todo[] {
    let preparedTodos = [...todosFromServer];

    if (filter === 'active') {
      preparedTodos = preparedTodos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      preparedTodos = preparedTodos.filter(todo => todo.completed);
    }

    preparedTodos = preparedTodos.filter(todo => todo.title.length > 0);
    if (query) {
      preparedTodos = preparedTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return preparedTodos;
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentTodo(null);
    setCurrentUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={prepareTodos(todos)}
                setShowModal={setShowModal}
                setCurrentTodo={setCurrentTodo}
                showModal={showModal}
              />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal
          currentUser={currentUser}
          modalLoading={modalLoading}
          currentTodo={currentTodo}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
