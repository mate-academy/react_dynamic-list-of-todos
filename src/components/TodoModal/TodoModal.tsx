import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { TodoModalProps } from '../../types/TodoModalProps';

export const TodoModal: React.FC<TodoModalProps> = ({ onClose, todo }) => {
  const {
    userId,
    id,
    title,
    completed,
  } = todo;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getUser(userId)
      .then((userData: User) => setUser(userData))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={completed
                ? 'has-text-success'
                : 'has-text-danger'}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
