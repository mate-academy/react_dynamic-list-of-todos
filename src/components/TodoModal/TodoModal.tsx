import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User>();
  const [isError, setIsError] = useState(false);
  const [isloading, setIsLoading] = useState(true);

  const {
    id,
    completed,
    title,
    userId,
  } = todo;

  useEffect(() => {
    const getUserFromServer = async () => {
      try {
        const userFromServer = await getUser(userId);

        setUser(userFromServer);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getUserFromServer();
  }, []);

  const displayError = (!user || isError) && !isloading;
  const displayModal = !isloading && !isError && user;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isloading && (
        <Loader />
      )}
      {displayError && (
        <div className="modal-card notification is-danger">
          <header className="modal-card-head">
            <div className="modal-card-title">
              Error
            </div>
            <button
              aria-label="close-modal-button"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <article className="modal-card-body">
            <p className="block has-text-dark has-text-weight-medium">
              The error has happened...
            </p>
          </article>
        </div>
      )}
      {displayModal && (
        <div className={classNames(
          'modal-card',
          'notification',
          {
            'is-success': completed,
            'is-danger': !completed,
          },
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
              aria-label="close-modal-button"
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
