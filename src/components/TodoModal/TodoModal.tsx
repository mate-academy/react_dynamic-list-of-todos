import React from 'react';
import { Loader } from '../Loader';
import { UsersTodo } from '../../types/Todo';

interface TodoModalProps {
  isLoading: boolean;
  selectedTodo: UsersTodo;
  onClose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  isLoading,
  selectedTodo,
  onClose,
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
              Todo #{selectedTodo.id}
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
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${selectedTodo.user.email}`}>
                {selectedTodo.user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
