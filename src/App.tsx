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
  const [loading, setLoading] = useState(false);
  const [showTodoId, setShowTodoId] = useState(0);
  const [isModalActive, setIsModalActive] = useState(false);
  const [todoOwner, setTodoOwner] = useState<User | null>(null);
  const [selectedUsers, setSelectedUsers] = useState('all');
  const [query, setQuery] = useState('');
  const [modalLoading, setModalLoading] = useState(false);

  const todo = todos.find(t => t.id === showTodoId) || null;
  const findUser = () => {
    setModalLoading(true);
    if (todo?.userId) {
      getUser(todo.userId)
        .then(({ email, id, name, phone }) => {
          setTodoOwner({ email, id, name, phone });
        })
        .finally(() => {
          setModalLoading(false);
        });
    }
  };

  useEffect(() => {
    findUser();
  }, [todo]);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  let filteredTodos = [...todos];

  if (selectedUsers === 'active') {
    filteredTodos = filteredTodos.filter(t => !t.completed);
  }

  if (selectedUsers === 'completed') {
    filteredTodos = filteredTodos.filter(t => t.completed);
  }

  if (query) {
    filteredTodos = filteredTodos.filter(el =>
      el.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedUsers={setSelectedUsers}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  filteredTodos={filteredTodos}
                  showTodoId={showTodoId}
                  setShowTodoId={setShowTodoId}
                  setIsModalActive={setIsModalActive}
                  isModalActive={isModalActive}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        showTodoId={showTodoId}
        isModalActive={isModalActive}
        todo={todo || null}
        setIsModalActive={setIsModalActive}
        todoOwner={todoOwner}
        modalLoading={modalLoading}
      />
    </>
  );
};
