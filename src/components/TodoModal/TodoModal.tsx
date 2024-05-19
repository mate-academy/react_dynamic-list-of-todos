import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  onClose: () => void;
}

const useUser = (userId: number) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    getUser(userId)
      .then(setUser)
      .catch(() => alert('Could not load user'))
      .finally(() => setIsLoadingUser(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, isLoadingUser };
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const { user, isLoadingUser } = useUser(todo.userId);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

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
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
