import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  todo: Todo | null;
  user: User | null;
  isUserLoading: boolean;
  closeModal: () => void;
}

export const TodoModal: React.FC<Props> = ({
  todo,
  user,
  isUserLoading,
  closeModal,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoading ? (
        <Loader data-cy="loader" />
      ) : todo ? (
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
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>
            {isUserLoading ? (
              <Loader data-cy="loader" />
            ) : user ? (
              <p className="block" data-cy="modal-user">
                {todo.completed === true ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                <a href={`mailto:${user.email}`}>{user.name}</a>
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};
