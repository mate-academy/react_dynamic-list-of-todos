import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  closeModal: (n: number) => void,
  todo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({
  closeModal, todo,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(todo?.userId || 1)
      .then(users => setUser(users))
      .catch(() => setUser(null));
  }, [todo?.userId]);

  return (
    <div
      className="modal is-active"
      data-cy="modal"
    >
      <div className="modal-background" />

      {user?.id !== todo?.userId ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            <button
              aria-label="delte-button"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => closeModal(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
