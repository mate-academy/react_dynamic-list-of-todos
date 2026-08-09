import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  todo: Todo | null;
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
  const statusText = todo?.completed ? 'Done' : 'Planned';

  return (
    <div
      className={classNames('modal', {
        'is-active': !!todo,
      })}
      data-cy="modal"
    >
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title" data-cy="modal-header">
            {todo && `Todo #${todo.id}`}
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
            todo && (
              <>
                <p className="title is-4" data-cy="modal-title">
                  {todo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {statusText}
                  {user && ` by ${user.name}`}
                </p>
              </>
            )
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
