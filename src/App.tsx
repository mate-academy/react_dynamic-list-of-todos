/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalIsLoading, setModalIsLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((data) => setTodos(data))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setModalIsLoading(true);

    if (selectedTodo?.userId) {
      getUser(selectedTodo?.userId)
        .then((data) => setSelectedUser(data))
        .finally(() => setModalIsLoading(false));
    }
  }, [selectedTodo]);

  const handleShowTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setOpenModal(true);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={todos}
                // setOpenModal={setOpenModal}
                handleShowTodo={handleShowTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <TodoModal
          setOpenModal={setOpenModal}
          selectedTodo={selectedTodo}
          selectedUser={selectedUser}
          modalIsLoading={modalIsLoading}
        />
      )}
    </>
  );
};
