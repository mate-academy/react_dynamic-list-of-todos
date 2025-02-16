import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { getUser } from '../../api';

type Props = {
  todo: Todo;
  handleClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, handleClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedUser = await getUser(todo.userId);

        setUser(fetchedUser);
      } catch (err) {
        setError('Не вдалося завантажити користувача');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleClose} />

      {loading ? (
        <Loader data-cy="loader" />
      ) : error ? (
        <div className="modal-content">
          <div className="box">
            <button
              type="button"
              className="delete"
              aria-label="close"
              data-cy="modal-close"
              onClick={handleClose}
            />
            <p className="has-text-danger">{error}</p>
          </div>
        </div>
      ) : (
        <div className="modal-content">
          <div className="box">
            <header className="modal-card-head">
              <p className="modal-card-title" data-cy="modal-header">
                Todo #{todo.id}
              </p>
              <button
                type="button"
                className="delete"
                aria-label="close"
                data-cy="modal-close"
                onClick={handleClose}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block">
                <strong>Status:</strong>{' '}
                <span
                  className={`has-text-${todo.completed ? 'success' : 'danger'}`}
                >
                  {todo.completed ? 'Completed' : 'Planned'}
                </span>
              </p>

              {user && (
                <p className="block" data-cy="modal-user">
                  {todo.completed ? 'Done by' : 'Planned by'} {user.name}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
