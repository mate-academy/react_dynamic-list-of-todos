import React, { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = React.memo(({ todo, onClose }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId)
      .then(userFromServer => {
        setUser(userFromServer);
      });
  }, []);

  const handleCloseButtonClick = () => onClose();

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {!user
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

              <button
                type="button"
                className="delete"
                aria-label="close"
                data-cy="modal-close"
                onClick={handleCloseButtonClick}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                {completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}

                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
});
