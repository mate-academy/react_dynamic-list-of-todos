import React, { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { ErrorBlock } from '../ErrorBlock';

interface Props {
  todo: Todo;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [updatedAt, setUpdatedAt] = useState(new Date());

  useEffect(() => {
    setLoading(true);
    getUser(todo.userId)
      .then(setUser)
      .catch(() => setError('Failed to get data from server'))
      .finally(() => setLoading(false));
  }, [todo, updatedAt]);

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
            {error ? (
              <ErrorBlock
                error={error}
                setError={setError}
                updateTimestamp={setUpdatedAt}
              />
            ) : (
              <>
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

                  {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
