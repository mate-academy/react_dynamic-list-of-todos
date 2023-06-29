import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface TodoModalProps {
  user: User | null;
  selectedTodo: Todo | null;
  closeModal: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = (
  { user, selectedTodo, closeModal },
) => {
  const isCompleted = selectedTodo?.completed
    ? 'Done'
    : 'Planned';

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={cn(
                {
                  'has-text-danger': !selectedTodo?.completed,
                  'has-text-success': selectedTodo?.completed,
                },
              )}
              >
                {isCompleted}

              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
