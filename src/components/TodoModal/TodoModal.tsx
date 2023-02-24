import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  onClose,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasLoading, setHasLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const waitForUsers = async () => {
    try {
      const userFromServer = await getUser(userId);

      setUser(userFromServer);
      setHasLoading(true);
      setHasError(false);
    } catch {
      setUser(null);
      setHasLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    waitForUsers();
  }, []);

  const todoStatusStyle = completed ? 'success' : 'danger';
  const todoStatusText = completed ? 'Done' : 'Planned';

  if (hasError) {
    return (
      <span>
        Todos not found
      </span>
    );
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {(hasLoading)
        ? (
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
                aria-label="button close"
                className="delete"
                data-cy="modal-close"
                onClick={onClose}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong className={`has-text-${todoStatusStyle}`}>
                  {todoStatusText}
                </strong>

                {' by '}

                <a href={`mailto:${user?.email}`}>
                  {user?.name}
                </a>
              </p>
            </div>
          </div>
        ) : (
          <Loader />
        )}
    </div>
  );
};
