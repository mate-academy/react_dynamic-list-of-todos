import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type TodoModalProps = {
  user: User | null,
  onModalClose: (id?: number) => void,
  todo: Todo | undefined;
};

export const TodoModal: React.FC<TodoModalProps> = ({
  user,
  onModalClose,
  todo,
}) => {
  const email = user?.email;
  const name = user?.name;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onModalClose()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${email}`}>
                {name}
              </a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
