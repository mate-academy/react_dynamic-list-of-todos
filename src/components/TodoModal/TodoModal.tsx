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
  const [isError, setIsError] = useState(false);

  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        const loadedUser = await getUser(userId);

        setUser(loadedUser);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  return (
    <div className="modalIsOpen is-active" data-cy="modalIsOpen">
      <div className="modalIsOpen-background" />

      {(!isLoading && todo) ? (
        <div className="modalIsOpen-card">
          <header className="modalIsOpen-card-head">
            <div
              className="modalIsOpen-card-title has-text-weight-medium"
              data-cy="modalIsOpen-header"
            >
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modalIsOpen-close"
              onClick={clickModal}
            />
          </header>

          <div className="modalIsOpen-card-body">
            <p className="block" data-cy="modalIsOpen-title">
              {title}
            </p>

            {(!isError && user) ? (
              <p className="block" data-cy="modalIsOpen-user">
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
