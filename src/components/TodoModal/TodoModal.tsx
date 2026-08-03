import { useEffect, useState } from 'react';
import { getUser } from '../../api';
import type { Todo } from '../../types/Todo';
import type { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal = ({ todo, onClose }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let isMounted = true;

    setUser(null);

    getUser(todo.userId).then(loadedUser => {
      if (isMounted) {
        setUser(loadedUser);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [todo.userId]);

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
              Todo #{todo.id}
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
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
