import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

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
      <div
        className="modal-background"
        data-cy="modal-background"
        onClick={onClose}
      />

      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title" data-cy="modal-header">
            Todo #{todo.id}
          </p>

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

          {loadingUser ? (
            <div data-cy="modal-loader">
              <Loader />
            </div>
          ) : user ? (
            <p className="block" data-cy="modal-user">
              {todo.completed ? 'Done' : 'Planned'} by {user.name}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
