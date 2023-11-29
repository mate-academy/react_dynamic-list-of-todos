import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

import { getUser } from '../../api';

type Props = {
  todo: Todo,
  setSelectedTodo: (todo: Todo | null) => void,
};

export const TodoModal: React.FC<Props> = ({
  todo,
  setSelectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const loadUser = async () => {
    try {
      const userFromServer = await getUser(userId);

      setUser(userFromServer);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && (
        <Loader />
      )}

      {!isLoading && !hasError && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo # ${id}`}
            </div>

            <button
              aria-label="Delete"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            {hasError && (
              <h2 style={{ color: 'red' }}>
                An error found while loading user info
              </h2>
            )}

            {user && (
              <p className="block" data-cy="modal-user">
                <strong
                  className={classNames({
                    'has-text-success': completed,
                    'has-text-danger': !completed,
                  })}
                >
                  {
                    completed
                      ? 'Done'
                      : 'Planned'
                  }
                </strong>

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
