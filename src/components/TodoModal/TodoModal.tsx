import React, { memo, useCallback, useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal = ({ todo, onClose }: Props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchUser = useCallback(() => {
    getUser(todo.userId)
      .then((fetchedUser: User) => setUser(fetchedUser))
      .catch(error => setFetchError(error.message))
      .finally(() => setLoading(false));
  }, [todo.userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleClose = () => {
    onClose();
  };

  const handleRetry = () => {
    setLoading(true);
    setFetchError(null);
    fetchUser();
  };

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
              Todo #{todo.id}
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
              {todo.title}
            </p>

            {fetchError ? (
              <>
                <div className="notification is-danger">{fetchError}</div>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="button is-link mt-4"
                >
                  Reload user data
                </button>
              </>
            ) : (
              <p className="block" data-cy="modal-user">
                {todo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(TodoModal);
