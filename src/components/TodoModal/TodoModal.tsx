import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Nullable } from '../../types/Nullable';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  todo: Todo;
  onCloseModal: () => void;
}

export const TodoModal = ({ todo, onCloseModal }: Props) => {
  const { id, title, completed, userId } = todo;

  const [user, setUser] = useState<Nullable<User>>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setUser(null);
    setErrorMessage(null);
    setIsLoading(true);

    getUser(userId)
      .then(setUser)
      .catch(() => setErrorMessage('Failed to fetch user'))
      .finally(() => setIsLoading(false));
  }, [userId]);

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
              Todo #{id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-danger': !completed,
                  'has-text-success': completed,
                })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              {user ? (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              ) : (
                <span>Unknown User</span>
              )}
            </p>

            {errorMessage && <p className="has-text-danger">{errorMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};
