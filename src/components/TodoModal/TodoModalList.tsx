import React from 'react';
import { User } from '../../types/User';

type Props = {
  isModalClosed: (event: boolean) => void;
  user: User;
};

export const TodoModalList: React.FC<Props> = ({ isModalClosed, user }) => {
  const { id, name, email } = user;

  const closeModal = (value: boolean) => {
    isModalClosed(value);
  };

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <div
          className="modal-card-title
          has-text-weight-medium"
          data-cy="modal-header"
        >
          Todo #
          {id}
        </div>

        <button
          type="button"
          className="delete"
          data-cy="modal-close"
          onClick={() => closeModal(false)}
        />
      </header>

      <div className="modal-card-body">
        <p className="block" data-cy="modal-title">
          {user.more[0].title}
        </p>

        <p className="block" data-cy="modal-user">
          {!user.more[0].completed ? (
            <strong className="has-text-danger">Planned</strong>
          ) : (
            <strong className="has-text-success">Done</strong>
          )}
          {' by '}
          <a href={`mailto:${email}`}>{name}</a>
        </p>
      </div>
    </div>
  );
};
