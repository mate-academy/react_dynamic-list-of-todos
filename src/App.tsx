/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
// import { getUser } from './components/services/getUser';
import { getUser } from './components/services/user';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './components/services/todos';

export const App: React.FC = () => {
  // const [users, setUsers] = useState<User[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoad] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState(false);

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  // useEffect(() => {
  //   setLoad(true);

  //   Promise.all([getTodos()])
  //     .then(([todosFromServer, usersFromServer]) => {
  //       setTodos(todosFromServer);
  //       setUsers(usersFromServer);
  //     })
  //     .catch(() => setError('try again later'))
  //     .finally(() => setLoad(false));
  // }, []);

  useEffect(() => {
    setLoad(true);
    setError('');

    getTodos()
      .then(setTodos)
      .catch(() => setError('try again later'))
      .finally(() => setLoad(false));
  }, []);

  const filteredTodos = todos.filter(todo => {
    // 1. Фильтр по статусу
    if (status === 'active' && todo.completed) {
      return false; // выполненные не показываем
    }

    if (status === 'completed' && !todo.completed) {
      return false; // невыполненные не показываем
    }

    // 2. Фильтр по поиску
    if (!todo.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    // 3. Всё подошло
    return true;
  });

  const getModalInfo = (todoId: number) => {
    const todo = todos.find(t => t.id === todoId);

    if (!todo) {
      return;
    }

    setSelectedTodoId(todoId);
    setModal(true);

    setUserLoading(true);
    setSelectedUser(null);

    getUser(todo.userId)
      .then(setSelectedUser)
      .catch(() => setError('try again later'))
      .finally(() => setUserLoading(false));
  };

  const closeModal = () => {
    setModal(false);
    setSelectedTodoId(null);
  };

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);
  // console.log(selectedTodo);

  // selectedUser = users.find(user => user.id === selectedTodo?.userId);
  // console.log(selectedUser);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                setStatus={setStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && filteredTodos.length > 0 && (
                <TodoList todos={filteredTodos} getModalInfo={getModalInfo} />
              )}
              {!loading && filteredTodos.length === 0 && !error && (
                <p>There are no users</p>
              )}
              {error && <p>{error}</p>}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        modal={modal}
        todo={selectedTodo}
        user={selectedUser}
        userLoading={userLoading}
        closeModal={closeModal}
      />
    </>
  );
};
