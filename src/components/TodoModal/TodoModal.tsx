import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  closeModal: () => void;
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({ closeModal, todo }) => {
  const [user, setUsers] = useState<User>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getUser(todo.userId)
      .then(setUsers)
      .catch(() => setLoading(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading
        ? (<Loader />)
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todo?.id}`}
              </div>

              <button
                type="button"
                aria-label="close modal"
                className="delete"
                data-cy="modal-close"
                onClick={closeModal}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo?.title}
              </p>

              {user && (
                <p className="block" data-cy="modal-user">
                  <strong className={classNames(
                    {
                      'has-text-danger': !todo.completed,
                      'has-text-success': todo.completed,
                    },
                  )}
                  >
                    {todo?.completed
                      ? 'Done'
                      : 'Planned'}
                  </strong>
                  {' by '}

                  <a href={`mailto:${user?.email}`}>
                    {user?.name}
                  </a>
                </p>
              )}
            </div>
          </div>
        )}
    </div>
  );
};
