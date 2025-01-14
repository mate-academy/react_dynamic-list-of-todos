import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  todo: Todo;
  resetTodo: () => void;
};

export const TodoModal: React.FC<Props> = ({ resetTodo, todo }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUser(todo.userId)
      .then(setUser)
      .catch(() => setError('Failed to load user'))
      .finally(() => setIsLoaded(true));
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {error ? (
        <div className="error">{error}</div>
      ) : isLoaded ? (
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
              onClick={resetTodo}
              aria-label="Close modal"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {user ? (
                <>
                  <strong
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {todo.completed ? 'Done' : 'Planned'}
                  </strong>
                  {' by '}
                  <a href={`mailto:${user.email}`}>{user.name}</a>
                </>
              ) : (
                <span>User not found</span>
              )}
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
