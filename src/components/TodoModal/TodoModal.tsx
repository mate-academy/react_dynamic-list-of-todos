import React, { useState, useEffect, memo } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  todo: Todo;
  onCancelModal: () => void;
}

export const TodoModal: React.FC<Props> = memo(({ todo, onCancelModal }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const userFromServer = await getUser(todo.userId);

      setUser(userFromServer);
    }

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
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onCancelModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed
                ? <strong className="has-text-completed">Done</strong>
                : <strong className="has-text-danger">Planned</strong> }

              {' by '}

              <a href={`mailto:${user.name}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
