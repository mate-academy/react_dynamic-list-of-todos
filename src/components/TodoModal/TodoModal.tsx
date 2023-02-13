import {
  FC, useCallback, useEffect, useState,
} from 'react';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';
import { User, Todo } from '../../types';
import { getUser } from '../../api';

type Props = {
  todo: Todo,
  onClose: () => void,
};

export const TodoModal: FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const fetchUser = useCallback(async () => {
    setHasError(false);
    setIsLoading(true);

    try {
      const fetchedUser = await getUser(userId);

      setUser(fetchedUser);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
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
              {`TodoItem #${id}`}
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

            {hasError && (
              <ErrorMessage
                message="Unable to fetch a user"
                onRetry={fetchUser}
              />
            )}

            {!!user && (
              <p className="block" data-cy="modal-user">
                {
                  completed
                    ? <strong className="has-text-success">Done</strong>
                    : <strong className="has-text-danger">Planned</strong>
                }

                {' by '}

                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
