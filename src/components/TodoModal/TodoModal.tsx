import React from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface Props {
  onClose: () => void;
  user?: User;
  errorUserMessage: string;
  isUserLoading: boolean;
  todo: Todo;
}
export const TodoModal: React.FC<Props> = ({
  onClose,
  user,
  errorUserMessage,
  isUserLoading,
  todo,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoading ? (
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
            {user ? (
              <>
                <p className="block" data-cy="modal-title">
                  {todo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  <strong
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {todo.completed ? 'Done' : 'Planned'}
                  </strong>

                  {' by '}

                  <a href={`mailto:${user?.email}`}>{user?.name}</a>
                </p>
              </>
            ) : (
              <p className="block" data-cy="modal-title">
                {errorUserMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
