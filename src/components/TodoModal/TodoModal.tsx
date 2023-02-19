import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo;
  closeModal: () => void;
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, closeModal }) => {
  const {
    id, title, completed, userId,
  } = selectedTodo;
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getUser(userId)
      .then(userFromServer => {
        setUser(userFromServer);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
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
              onClick={closeModal}
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

              {!hasError
                ? (
                  <a href={`mailto:${user?.email}`}>
                    {user?.name}
                  </a>
                ) : (
                  <strong>Unknown</strong>
                )}
            </p>

            {hasError && (
              <div className="notification is-warning">
                Server error!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
