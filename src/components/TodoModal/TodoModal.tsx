import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo
  onClose: () => void
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    setIsUserLoading(true);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => setIsUserLoading(false));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onClose()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            {isUserLoading && user
              ? <Loader />
              : (
                <p className="block" data-cy="modal-user">
                  {/* <strong className="has-text-success">Done</strong> */}
                  <strong className="has-text-danger">{user?.name}</strong>

                  {' by '}

                  <a href={`mailto:${user?.email}`}>
                    {user?.email}
                  </a>
                </p>
              )}
          </div>
        </div>
      )}
    </div>
  );
};
