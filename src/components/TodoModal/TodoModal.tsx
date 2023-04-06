import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  todo: Todo
  onClose: () => void
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState(false);

  const {
    id,
    completed,
    userId,
    title,
  } = todo;

  useEffect(() => {
    const getUsersFromServer = async () => {
      try {
        const usersFromServer = await getUser(userId);

        setUser(usersFromServer);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getUsersFromServer();
  }, []);

  const dispayError = (!user || error) && !loading;
  const displayModal = (!loading || !error) && user;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && (
        <Loader />
      )}
      {dispayError && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Error
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
              Something went wrong...
            </p>
          </div>
        </div>
      )}

      {displayModal && (
        <div className={classNames(
          'modal-card',
        )}
        >
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <button
              aria-label="close-button"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block has-text-dark" data-cy="modal-title">
              {title}
            </p>

            <p className="block has-text-dark" data-cy="modal-user">
              <strong className={classNames(
                {
                  'has-text-danger': !completed,
                  'has-text-success': completed,
                },
              )}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

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
