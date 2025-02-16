import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  userId: number;
  todo: Todo | null;
  onReset: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  userId,
  onReset = () => {},
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);

  useEffect(() => {
    setLoadingModal(true);
    getUser(userId)
      .then(currentUser => setUser(currentUser))
      .finally(() => setLoadingModal(false));
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingModal ? (
        <Loader data-cy="loader" />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onReset}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
