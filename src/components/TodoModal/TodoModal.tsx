import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo;
  onClose: () => void;
};

const getUserNameByTodo = (user: User | null): string => {
  return user ? user.name : 'Unknown User';
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [loader, setLoader] = useState(true);
  const [modalIsActive, setModalIsActive] = useState(false);
  const [bgActive, setBgActive] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    setLoader(true);
    getUser(todo.userId)
      .then(loadUser => {
        setUser(loadUser);
      })
      .finally(() => {
        setLoader(false);
        setModalIsActive(true);
      });
  }, [todo]);

  useEffect(() => {
    setSelectedUser(getUserNameByTodo(user));
  }, [user]);

  const handleCloseButton = () => {
    setBgActive(false);
    onClose();
  };

  return (
    <div className={`modal ${bgActive ? 'is-active' : ''}`} data-cy="modal">
      <div className="modal-background" onClick={handleCloseButton} />
      {loader ? (
        <Loader />
      ) : (
        modalIsActive && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{todo.id}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={handleCloseButton}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todo.completed ? 'Done' : 'Planned'}
                </strong>
                {' by '}
                <a href={`mailto:${user?.email || ''}`}>{selectedUser}</a>
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};
