import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo | null;
  open: boolean;
  onClose: () => void;
  isLoading?: boolean;
};

export const TodoModal: React.FC<Props> = ({
  open,
  todo,
  onClose,
  isLoading = false,
}) => {
  if (!open || !todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {isLoading ? (
        <div className="modal-card">
          <div className="modal-card-body">
            <Loader />
          </div>
        </div>
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
              aria-label="Close modal"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              <strong>Title:</strong> {todo.title}
            </p>

            <p className="block" data-cy="modal-status">
              <strong>Status:</strong>{' '}
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
            </p>

            {todo.user && (
              <p className="block" data-cy="modal-user">
                <strong>Assigned to:</strong>{' '}
                <a href={`mailto:${todo.user.email}`}>{todo.user.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
