import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type TodoModalProps = {
  todo: Todo | null;
  user: User | null;
  isLoading: boolean;
  onClose: () => void;
};

export const TodoModal: React.FC<TodoModalProps> = ({
  todo, user, isLoading, onClose,
}) => {
  if (!todo) {
    return null;
  }

  const userName = user?.name;

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        aria-label="Close modal"
      />

      {isLoading ? (
        <Loader data-cy="loader" />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              `Todo #
              $
              {todo.id}
              `
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
              aria-label="Close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              {user ? (
                <a href={`mailto:${user.email}`}>
                  {userName}
                </a>
              ) : 'Loading user...'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoModal;
