/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { getSortedTodos } from './helpers/getSortedTodos';

export const App: React.FC = () => {
  const initialTodo = {
    id: -1,
    title: '',
    completed: false,
    userId: -1,
  };
  const initialUser = { id: -1, name: '', email: '', phone: '' };

  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [activeTodo, setActiveTodo] = useState(initialTodo);
  const [userTodo, setUserTodo] = useState(initialUser);
  const [sortStatus, setSortStatus] = useState('all');
  const [querry, setQuerry] = useState('');

  const sortedTodos = getSortedTodos(todoList, { sortStatus, querry });

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodoList)
      .finally(() => setLoading(false));
  }, []);

  const handleUserChoose = (userId: number) => {
    setModalShow(true);
    setLoadingModal(true);
    getUser(userId)
      .then(setUserTodo)
      .finally(() => setLoadingModal(false));
  };

  const handleModalClose = () => {
    setActiveTodo(initialTodo);
    setModalShow(false);
    setUserTodo(initialUser);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onStatusChange={setSortStatus}
                onQuerryChange={setQuerry}
                querry={querry}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={sortedTodos}
                onUserChoose={handleUserChoose}
                onChangeActiveTodo={setActiveTodo}
                activeTodo={activeTodo}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        user={userTodo}
        loading={loadingModal}
        onModalShow={modalShow}
        onModalClose={handleModalClose}
        todo={activeTodo}
      />
    </>
  );
};
