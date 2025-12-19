import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { useEffect, useState } from 'react';
import { getUser } from '../../api';
import cn from 'classnames';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal = ({ todo, onClose }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoadingUser(true);
    getUser(todo.userId)
      .then(data => setUser(data))
      .catch(() => setError(true))
      .finally(() => setIsLoadingUser(false));
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {isLoadingUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
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
                className={cn({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              {user ? (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              ) : (
                'Unknown user'
              )}
            </p>
          </div>
        </div>
      )}
      {error && <p className="has-text-danger">Could not load user details</p>}
    </div>
  );
};
