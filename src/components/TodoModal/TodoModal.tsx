import React, { useEffect, useState, useCallback } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { getUser } from '../../api';

interface Props {
  todo: Todo;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetUser = useCallback(async () => {
    setIsLoading(true);
    const userData = await getUser(todo.userId);

    setUser(userData);
    setIsLoading(false);
  }, [todo.userId]);

  useEffect(() => {
    handleGetUser();
  }, [handleGetUser]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />
      {isLoading ? (
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
            <>
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>
              {user && (
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
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};
