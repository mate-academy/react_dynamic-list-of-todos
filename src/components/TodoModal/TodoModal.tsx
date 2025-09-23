import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  todo: Todo;
  user: User | null;
  isLoading: boolean;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({
  todo,
  user,
  isLoading,
  onClose,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {isLoading ? (
        <div className="modal-card">
          <Loader />
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
              data-cy="modal-close"
              type="button"
              className="delete"
              onClick={onClose}
              aria-label="close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? 'Done' : 'Planned'} by{' '}
              <strong>{user?.name || 'Unknown User'}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
