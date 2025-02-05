import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  closeModal: () => void;
  userId?: number;
  todo?: Todo ;
};

export const TodoModal: React.FC<Props> = ({ closeModal, userId, todo }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userId) {
      getUser(userId)
        .then(receivedUser => setUser(receivedUser))
        .finally(() => setLoading(false));
    }
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
              Todo #{todo && todo.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo && todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo && todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user && user.email}`}>{user && user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
