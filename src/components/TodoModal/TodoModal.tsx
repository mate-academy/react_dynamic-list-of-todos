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
  const statusText = todo.completed ? 'Done' : 'Planned';

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title" data-cy="modal-header">
            {`Todo #${todo.id}`}
          </p>

          <button
            type="button"
            className="delete"
            aria-label="close"
            data-cy="modal-close"
            onClick={onClose}
          />
        </header>

        <section className="modal-card-body">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <p className="title is-4" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {statusText}
                {user && ` by ${user.name}`}
              </p>
            </>
          )}
        </section>

        <footer className="modal-card-foot">
          <button type="button" className="button" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};
