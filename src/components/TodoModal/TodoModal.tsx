import React, { FC, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo | null;
  onClose: () => void;
}

export const TodoModal: FC<Props> = React.memo(({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (todo) {
      const { userId } = todo;

      getUser(userId)
        .then(userFromServer => {
          setUser(userFromServer);
        });
    }
  }, [todo]);

  if (!todo) {
    return null;
  }

  const { title, id, completed } = todo;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {!user
        ? (<Loader />)
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
                aria-label="delete"
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

              <p className="block" data-cy="modal-user">
                {completed
                  ? (<strong className="has-text-success">Done</strong>)
                  : (<strong className="has-text-danger">Planned</strong>)}

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
