import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import classNames from 'classnames';

type Props = {
  todo: Todo | null;
  onModalCloseClick: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onModalCloseClick }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!todo) {
      return;
    }

    setLoading(true);
    setUser(null);

    getUser(todo.userId)
      .then(u => setUser(u))
      .finally(() => setLoading(false));
  }, [todo]);

  if (!todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
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

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onModalCloseClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-success': todo?.completed,
                  'has-text-danger': !todo?.completed,
                })}
              >
                {todo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
