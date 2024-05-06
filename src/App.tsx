/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { Todo } from './types/Todo';

export const App: FC = () => {
  // #region state
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodos, setFilterTodos] = useState<Todo[]>(todos);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const [userId, setUserId] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [isActive, setIsActive] = useState(false);
  // #endregion

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(data => {
        setTodos(data);
        setFilterTodos(data);
      })
      .catch(e => setErrorMessage(e))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (isActive) {
      setLoadingModal(true);

      getUser(userId)
        .then(user => {
          setSelectedUser(user);
        })
        .catch(e => setErrorMessage(e))
        .finally(() => setLoadingModal(false));
    }
  }, [isActive, userId]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            {errorMessage && <h2>{errorMessage}</h2>}
            <div className="block">
              <TodoFilter todos={todos} setFilterTodos={setFilterTodos} />
            </div>

            <div className="block">
              <Loader loading={loading} />

              <TodoList
                todos={filterTodos}
                setIsActive={() => setIsActive(!isActive)}
                isActive={isActive}
                setUserId={setUserId}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                setActiveTodo={setActiveTodo}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        user={selectedUser}
        activeTodo={activeTodo}
        loading={loadingModal}
        isActive={isActive}
        setIsActive={() => setIsActive(false)}
        setActiveButton={() => setActiveButton(null)}
      />
    </>
  );
};
