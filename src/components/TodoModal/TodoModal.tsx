import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo,
  clickModal: () => void
};

export const TodoModal: React.FC<Props> = ({ todo, clickModal }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasIsLoadingError] = useState(false);

  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  useEffect(() => {
    const loadUser = async () => {
      try {
        const loadedUser = await getUser(userId);

        setUser(loadedUser);
        setIsLoading(true);
        setHasIsLoadingError(false);
      } catch (error) {
        setIsLoading(true);
        setHasIsLoadingError(true);
      }
    };

    loadUser();
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {(isLoading && todo) ? (
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
              onClick={clickModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            {(!hasLoadingError && user) ? (
              <p className="block" data-cy="modal-user">
                {completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>

                )}

                {' by '}

                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            ) : (
              <p>User is not found!</p>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
