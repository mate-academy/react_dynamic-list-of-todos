import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';
//
type Props = {
  selectedTodo: Todo;
  setSelectedTodoId: any;
};

export const TodoModal: React.FC<Props>
= ({ selectedTodo, setSelectedTodoId }) => {
  const [isLoaded, setIsLoader] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  // const [showModal,setShowModal] = useState(false);

  const selectedUser: User | null = allUsers
    .find((user: User) => user.id === selectedTodo.userId) || null;

  const BASE_URL = 'https://mate-academy.github.io'
  + '/react_dynamic-list-of-todos/api';

  const request = (url: any) => {
    return fetch(`${BASE_URL}${url}`)
      .then(response => {
        return response.json();
      })
      .then(result => result);
  };

  const getUsers = () => request('/users.json');

  useEffect(() => {
    setIsLoader(true);
    getUsers()
      .then(users => {
        setAllUsers(users);
      })
      .finally(() => {
        setIsLoader(false);
      });
  }, []);

  const handleClick = () => {
    setSelectedTodoId(0);
  };

  return (

    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              { selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              { selectedUser && (
                <UserInfo selectedUser={selectedUser} />

              )}

            </p>
          </div>
        </div>
      )}
    </div>
  );
};
