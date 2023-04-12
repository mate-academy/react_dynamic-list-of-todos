import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';

import { getUser } from '../../api';

import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodo: Todo;
  onTodoUnselect: () => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo: {
    id,
    title,
    completed,
    userId,
  },
  onTodoUnselect: onUserUnselect,
}) => {
  const [user, setUser] = useState<null | User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  useEffect(() => {
    setHasLoadingError(false);
    setIsLoading(true);

    getUser(userId)
      .then(setUser)
      .catch(() => setHasLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      {!isLoading && (
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
              onClick={onUserUnselect}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            {hasLoadingError ? (
              <ErrorMessage message="error" />
            ) : (
              <section className="block" data-cy="modal-user">
                <strong
                  className={classNames(
                    {
                      'has-text-success': completed,
                      'has-text-danger': !completed,
                    },
                  )}
                >
                  {completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${user?.email}`}>
                  {user?.name}
                </a>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
