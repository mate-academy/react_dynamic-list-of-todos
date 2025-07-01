import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  todo: Todo | null;
  user: User | null;
  userLoading: boolean;
  onClose?: () => void;
}

export const TodoModal: React.FC<Props> = ({
  todo,
  user,
  userLoading,
  onClose,
}) => {
  if (!todo) {
    return null;
  }

  if (userLoading) {
    return (
      <div
        className="modal is-active"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(10, 10, 10, 0.86)',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1050,
        }}
        data-cy="modal"
      >
        <div
          className="loader is-loading"
          style={{
            width: '64px',
            height: '64px',
          }}
          data-cy="loader"
        />
      </div>
    );
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

          <p className="block" data-cy="modal-user">
            <strong
              className={
                todo.completed ? 'has-text-success' : 'has-text-danger'
              }
            >
              {todo.completed ? 'Done' : 'Planned'}
            </strong>{' '}
            {user && (
              <a
                href={`mailto:${user.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
                style={{ fontWeight: 'normal' }}
              >
                by {user.name}
              </a>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
