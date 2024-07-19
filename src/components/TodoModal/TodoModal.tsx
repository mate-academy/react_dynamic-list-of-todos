import React from 'react';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

interface Props {
  todo: Todo;
  user: User | null;
  onClose: () => void;
  loadingUser: boolean;
}

export const TodoModal: React.FC<Props> = ({
  todo,
  user,
  onClose,
  loadingUser,
}) => {
  if (!todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
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
          {loadingUser ? (
            <Loader />
          ) : (
            <>
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
                {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
