import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { UserStatus } from '../UserStatus';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasLoading, setHasLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      setHasLoading(true);
      setUser(null);
      try {
        const fetchedUser = await getUser(todo.userId);

        setUser(fetchedUser);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch user:', error);
        setUser(null);
      } finally {
        setHasLoading(false);
      }
    };

    fetchUser();
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {hasLoading ? (
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

            {user ? (
              <UserStatus isCompleted={todo.completed} user={user} />
            ) : (
              <p>User information is not available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
