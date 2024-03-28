/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { Status } from './enums/Status';
import { User } from './types/User';
import { SetTodo } from './interfaces/interfaces';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [text, setText] = useState('');
  const [status, setStatus] = useState(Status.All);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [usersId, setUsersId] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);
  const [choseTodo, setChoseTodo] = useState<SetTodo>({
    id: null,
    title: '',
    completed: false,
    highlighteTodo: false,
  });

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setChoseTodo(prevState => ({
      ...prevState,
      highlighteTodo: false,
    }));
  };

  const handleCheckStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as Status);
  };

  const handleFiltration = (query: string, condition: Status) => {
    let preparedTodos = [...todos];

    if (query) {
      preparedTodos = preparedTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (condition) {
      switch (condition) {
        case Status.Active.toLowerCase():
          preparedTodos = preparedTodos.filter(todo => !todo.completed);
          break;
        case Status.Completed.toLowerCase():
          preparedTodos = preparedTodos.filter(todo => todo.completed === true);
          break;
      }
    }

    return preparedTodos;
  };

  const visibleTodos = handleFiltration(text, status);

  useEffect(() => {
    getTodos().then(res => {
      setTodos(res);
      setLoading(!res);
    });
  }, []);

  useEffect(() => {
    getUser(usersId)
      .then(response => {
        setUser(response);
      })
      .finally(() => setLoadingUser(false));
  }, [usersId]);

  const handleClearInput = () => {
    setText('');
  };

  const handleShowModal = useMemo(
    () => (id: number, information: SetTodo) => {
      setShowModal(true);
      setLoadingUser(true);
      setUsersId(id);
      setChoseTodo(information);
    },
    [setShowModal, setLoadingUser, setUsersId, setChoseTodo],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                text={text}
                handleFilter={handleFilter}
                handleClearInput={handleClearInput}
                handleCheckStatus={handleCheckStatus}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  handleShowModal={handleShowModal}
                  choseTodo={choseTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal
          user={user}
          choseTodo={choseTodo}
          loading={loadingUser}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
