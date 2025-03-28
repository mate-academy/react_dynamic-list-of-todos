import React from 'react';
import { Loader } from '../Loader';

interface Props {
  todo: Todo;
  user: User | null;
  onClose: () => void;
  isLoading: boolean;
}

export const TodoModal: React.FC<Props> = ({
  todo,
  user,
  onClose,
  isLoading,
}) => {
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
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              {user ? (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              ) : (
                'Loading user...'
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
