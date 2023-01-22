import React, { useState, useEffect, useCallback, memo } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export type Props = {
  todoUserId: Todo;
  onClose(todId: number): void
};

export const TodoModal: React.FC<Props> = memo(({ todoUserId, onClose }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(todoUserId.userId)
      .then(userInfo => setUser(userInfo));
  }, []);

  const handleClose = useCallback(() => {
    onClose(0);
  }, []);

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
              {`Todo #${todoUserId.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoUserId.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todoUserId.completed === true
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
});
