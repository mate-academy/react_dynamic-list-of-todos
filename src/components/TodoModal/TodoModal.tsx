import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo;
  onSelectedTodo: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onSelectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const {
    id,
    title,
    completed,
    userId,
  } = selectedTodo;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userFromServer = await getUser(userId);

        setUser(userFromServer);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error);
        setHasError(true);
      }

      setIsLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoading
        ? <Loader />
        : (
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
                onClick={() => {
                  onSelectedTodo(null);
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                {completed
                  ? (<strong className="has-text-success">Done</strong>)
                  : (<strong className="has-text-danger">Planned</strong>)}

                {' by '}

                <a href={`mailto:${user?.email}`}>
                  {user?.name}
                </a>
              </p>
            </div>
          </div>
        )}
      {hasError && (
        <div className="notification is-danger has-text-centered">
          <strong>An error occurred when loading user</strong>
        </div>
      )}
    </div>
  );
};
