import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  isLoadingUser: boolean;
  user: User | null;
  close: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  isLoadingUser,
  user,
  close,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadingUser ? (
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
              onClick={close}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>
            {user && (
              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong className="has-text-danger">
                  {todo.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${user.email}`}>{user.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
