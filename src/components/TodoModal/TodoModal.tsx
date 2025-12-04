import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  isOpen: boolean;
  todo: Todo | null;
  user: User | null;
  loadingUser: boolean;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  isOpen,
  todo,
  user,
  loadingUser,
  onClose,
}) => {
  if (!isOpen || !todo) {
    return null;
  }

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
              {`Todo #${todo.id}`}
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
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {user ? (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              ) : (
                <span />
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
