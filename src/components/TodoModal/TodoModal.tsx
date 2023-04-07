import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal: FC<Props> = ({ todo, onClose }) => {
  const {
    id,
    completed,
    title,
    userId,
  } = todo;

  const [user, setUser] = useState<User>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);

    const getUserFromServer = async () => {
      try {
        const newUser = await getUser(userId);

        setUser(newUser);
      } catch {
        setHasError(true);
      } finally {
        setIsLoaded(true);
      }
    };

    getUserFromServer();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isLoaded && (
        <Loader />
      )}

      {hasError && (
        <div className="notification is-danger">
          <button
            type="button"
            className="delete"
            aria-label="close modal window"
            onClick={onClose}
          />

          Something went wrong! Unable to load user. Try again.
        </div>
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

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="close modal window"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames(
                  'has-text-success',
                  { 'has-text-danger': !completed },
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
