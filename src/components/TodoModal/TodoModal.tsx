import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface TodoModalProps {
  todo: Todo;
  user: User | null;
  loadingUser: boolean;
  onClose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  user,
  loadingUser,
  onClose,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {loadingUser ? (
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

            <p className="block" data-cy="modal-user">
              <strong className="has-text-danger">
                {todo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              {user ? (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              ) : (
                <span>No user information available</span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
