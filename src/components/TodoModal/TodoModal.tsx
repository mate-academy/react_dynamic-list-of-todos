import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  todo: Todo;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    setIsUserLoading(true);
    getUser(todo.userId)
      .then(setUser)
      .finally(() => setIsUserLoading(false));
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card">
        {isUserLoading ? (
          <div className="modal-card-body">
            <Loader />
          </div>
        ) : (
          <>
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todo.id}`}
              </div>
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={onClose}
              />
            </header>
            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>
              <p className="block" data-cy="modal-user">
                <strong
                  className={classNames({
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
                  })}
                >
                  {todo.completed ? 'Done' : 'Planned'}
                </strong>
                {' by '}
                {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
