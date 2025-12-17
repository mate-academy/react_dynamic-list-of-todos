import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type TodoModalProps = {
  todo: Todo | null;
  user: User | null;
  onClose: () => void;
  isOpen: boolean;
};

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  user,
  onClose,
  isOpen,
}) => {
  if (!isOpen || !todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {!user ? (
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
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}{' '}
              by{' '}
              <a href={`mailto:${user.email}`} data-cy="modal-user-email">
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
