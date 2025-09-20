import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Loader } from '../Loader';

type Props = {
  todo: Todo | null;
  onCloseModal: (todo: null) => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onCloseModal }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (todo) {
      let isCancelled = false;

      setUser(null);
      setError('');

      getUser(todo.userId)
        .then(loadedUser => {
          if (!isCancelled) {
            setUser(loadedUser);
          }
        })
        .catch(() => {
          if (!isCancelled) {
            setError('Failed to load user. Please try again.');
          }
        });

      return () => {
        isCancelled = true;
      };
    }

    return undefined;
  }, [todo]);

  const handleClose = () => {
    onCloseModal(null);
  };

  if (!todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {error ? (
        <div className="modal-card">
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
              onClick={handleClose}
            />
          </header>
          <div className="modal-card-body">
            <p className="has-text-danger">{error}</p>
          </div>
        </div>
      ) : !user ? (
        <Loader />
      ) : (
        <div className="modal-card">
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
              onClick={handleClose}
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
              <a href={`mailto:${user!.email}`}>{user!.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
