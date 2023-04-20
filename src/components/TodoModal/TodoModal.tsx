import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
  closeModal: () => void;
};

export const TodoModal: React.FC<Props> = React.memo(({ todo, closeModal }) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasError, setHasError] = useState(false);
  const {
    title,
    id,
    completed,
    userId,
  } = todo;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userFromServer = await getUser(userId);

        setUser(userFromServer);
      } catch (error) {
        setHasError(true);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
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

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            {hasError
              ? <span>No user on server</span>
              : (
                <p className="block" data-cy="modal-user">
                  {completed
                    ? <strong className="has-text-success">Done</strong>
                    : <strong className="has-text-danger">Planned</strong>}

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
});
