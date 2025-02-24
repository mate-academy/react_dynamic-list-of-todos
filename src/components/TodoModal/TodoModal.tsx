import React, { useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface TodoModalProps {
  todo: Todo | null;
  onClose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (todo) {
      setLoading(true);
      setError(null);

      setTimeout(() => {
        fetch(
          `https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${todo.userId}.json`,
        )
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch user');
            }

            return response.json();
          })
          .then(setUser)
          .catch(() => setError('Failed to load user'))
          .finally(() => setLoading(false));
      }, 300);
    }
  }, [todo]);

  if (!todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />
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

          {loading ? (
            <Loader />
          ) : error ? (
            <p className="has-text-danger">{error}</p>
          ) : (
            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              {user ? (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              ) : (
                'Unknown User'
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
