import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  modalActiveTodo: Todo | null;
  handleResetUser: () => void;
};

export const TodoModal: React.FC<Props> = ({
  modalActiveTodo,
  handleResetUser,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const {
    userId,
    id,
    title,
    completed,
  } = modalActiveTodo || {};

  if (!userId) {
    throw new Error('userId is not defined');
  }

  const loadUser = async () => {
    const userFromServer = await getUser(userId);

    setUser(userFromServer);
  };

  useEffect(
    () => {
      loadUser();
    },
    [],
  );

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleResetUser}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}
              {' by '}
              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
