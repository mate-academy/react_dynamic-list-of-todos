import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { LoadingError } from '../LoaderError/LoadingError';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  onClose,
}) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  useEffect(() => {
    const loadUserInfo = async (userID: number) => {
      setIsLoading(true);

      try {
        const loadedUser = await getUser(userID);

        setUser(loadedUser);
      } catch (error) {
        setHasLoadingError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserInfo(userId);
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && (
        <Loader />
      )}

      {user && (
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
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={classNames(
                { 'has-text-danger': !completed },
                { 'has-text-success': completed },
              )}
              >
                {completed ? ('Done') : ('Planned')}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}

      {hasLoadingError && (
        <>
          <LoadingError />

          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={onClose}
          >
            Close
          </button>
        </>
      )}
    </div>
  );
};
