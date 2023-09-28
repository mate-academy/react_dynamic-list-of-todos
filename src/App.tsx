/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { UserInfo } from './types/UserInfo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [loaderStatus, setLoaderStatus] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [modalLoaderStatus, setModalLoaderStatus] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const [filterStatus, setFilterStatus] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    getTodos()
      .then((response) => setTodos(response))
      .finally(() => setLoaderStatus(false));
  }, []);

  const openModal = (currentTodo: Todo) => {
    setShowModal(true);
    getUser(currentTodo.userId)
      .then((user) => setUserInfo({ ...user, todo: { ...currentTodo } }))
      .finally(() => setModalLoaderStatus(false));
  };

  const closeModal = () => {
    setShowModal(false);
    setUserInfo(null);
    setModalLoaderStatus(true);
  };

  const filteredTodosByValue = useMemo(() => {
    return todos.filter(({ title }) => {
      return title.toLowerCase().includes(filterValue.toLowerCase());
    });
  }, [todos, filterValue]);

  const filteredTodosByStatus = useMemo((): Todo[] => {
    switch (filterStatus) {
      case Status.Active:
        return filteredTodosByValue.filter(({ completed }) => !completed);
      case Status.Completed:
        return filteredTodosByValue.filter(({ completed }) => completed);
      default:
        return filteredTodosByValue;
    }
  }, [filteredTodosByValue, filterStatus]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
              />
            </div>

            <div className="block">
              {loaderStatus && <Loader />}

              {!loaderStatus && (
                <TodoList
                  todos={filteredTodosByStatus}
                  openModal={openModal}
                  userInfoId={userInfo?.todo.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal
          userInfo={userInfo}
          loaderStatus={modalLoaderStatus}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
