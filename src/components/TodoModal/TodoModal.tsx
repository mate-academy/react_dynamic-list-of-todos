import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
  onClick: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  onClick,
}) => {
  const {
    id,
    title,
    userId,
    completed,
  } = todo;
  const [user, setUser] = useState<User | null>(null);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      let userFromApi;

      try {
        userFromApi = await getUser(userId);
      } catch (error) {
        setHasLoadingError(true);

        return;
      }

      setUser(userFromApi);
    };

    loadUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user && !hasLoadingError ? (
        <Loader />
      ) : (
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
              aria-label="clear input"
              data-cy="modal-close"
              onClick={onClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={cn(
                'has-text-danger',
                { 'has-text-success': completed },
              )}
              >
                {completed
                  ? 'Done'
                  : 'Planned'}
              </strong>

              {' by '}

              {hasLoadingError && (
                <span style={{ color: 'red' }}>
                  User not found
                </span>
              )}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
