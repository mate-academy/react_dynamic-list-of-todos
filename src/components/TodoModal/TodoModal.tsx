import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface TodoModalProps {
  todo: Todo | null;
  user: User | null;
  onClose: () => void;
  isLoadingUser: boolean;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  user,
  onClose,
  isLoadingUser,
}) => {
  if (!todo) {
    return null;
  }

  const statusText = todo.completed ? 'Done' : 'Planned';
  const statusClass = todo.completed ? 'has-text-success' : 'has-text-danger';

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{todo.id}
          </p>
          <button
            className="delete"
            data-cy="modal-close"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>

        <section className="modal-card-body">
          {isLoadingUser ? (
            <Loader />
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong className={statusClass}>{statusText}</strong>
                {' by '}
                {user ? (
                  <a href={`mailto:${user.email}`}>{user.name}</a>
                ) : (
                  <span className="has-text-grey-light">Unknown user</span>
                )}
              </p>
            </>
          )}
        </section>

        <footer className="modal-card-foot"></footer>
      </div>
    </div>
  );
};
