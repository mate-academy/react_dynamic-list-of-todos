import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Loader } from '../Loader';
import { Props } from './TodoModal.types';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Error } from '../Error/Error';

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  handleCloseButton,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [hasError, setHasError] = useState(false);

  const loadUser = async () => {
    try {
      const user = await getUser(selectedTodo.userId);

      setSelectedUser(user);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const { title, id, completed } = selectedTodo;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && (
        <Loader />
      )}

      {selectedUser && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <button
              aria-label="close"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseButton}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames(
                  { 'has-text-success': completed },
                  { 'has-text-danger': !completed },
                )}
              >
                {completed
                  ? (
                    'Done'
                  )
                  : (
                    'Planned'
                  )}
              </strong>

              {' by '}

              <a href={`mailto:${selectedUser.email}`}>
                {selectedUser.name}
              </a>
            </p>
          </div>
        </div>
      )}

      {hasError && (
        <>
          <Error />

          <button
            type="button"
            className="button is-danger"
            onClick={handleCloseButton}
          >
            Close
          </button>
        </>
      )}
    </div>
  );
};
