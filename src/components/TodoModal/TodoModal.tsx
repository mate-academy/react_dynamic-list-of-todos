import React, { memo, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../api';
import { User } from '../../types/User';

interface Props {
  selectedTodo: Todo,
  onClose: () => void,
}

export const TodoModal: React.FC<Props> = memo(({
  selectedTodo,
  onClose,
}) => {
  const {
    id,
    title,
    completed,
    userId,
  } = selectedTodo;

  const [isUserLoading, setIsUserLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsUserLoading(true);
    setUser(null);
    getUserById(userId)
      .then((userFromServer) => setUser(userFromServer))
      .finally(() => setIsUserLoading(false));
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoading
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
                onClick={onClose}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              {user
                && (
                  <p className="block" data-cy="modal-user">
                    {completed
                      ? (<strong className="has-text-success">Done</strong>)
                      : (<strong className="has-text-danger">Planned</strong>)}
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
