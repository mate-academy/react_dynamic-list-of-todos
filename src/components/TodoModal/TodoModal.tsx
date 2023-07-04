import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo;
  handleClick: () => void;
};

const errorText = 'User not found';

export const TodoModal: React.FC<Props> = ({ todo, handleClick }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('User not found');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responce = await getUser(userId);

        setUser(responce);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }

        setIsLoading(false);
      }
    };

    fetchUser();
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
              {`Todo #${id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClick}
              aria-label="delete"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>
            {errorMessage !== errorText || !user
              ? <p>{errorMessage}</p>
              : (
                <span>
                  <p className="block" data-cy="modal-user">
                    {completed
                      ? <strong className="has-text-success">Done</strong>
                      : <strong className="has-text-danger">Planned</strong>}

                    <a href={`mailto:${user.email}`}>
                      {user.name}
                    </a>
                  </p>
                </span>
              )}
          </div>
        </div>
      )}
    </div>
  );
};
