import React from 'react';
import { Loader } from '../Loader';
import { TodoUser } from '../../types/User';
import { check } from '../../api';

type Props = {
  user: TodoUser
  setEyeMark: (arg: number) => void
  setUserModal: (arg: TodoUser | null) => void
};

export const TodoModal: React.FC<Props> = ({
  user,
  setEyeMark,
  setUserModal,
}) => {
  const closeButtonHandler = () => {
    setUserModal(null);
    setEyeMark(-1);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      { check(user.todo) ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${user.todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeButtonHandler}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {user.todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {user.todo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}
              {' by '}
              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      ) : (<Loader />)}
    </div>
  );
};
