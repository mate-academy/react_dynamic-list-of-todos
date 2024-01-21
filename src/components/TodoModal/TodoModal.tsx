import React from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  user?: User
  todo?: Todo
  hide: (b: boolean) => void
  activeUser:(user: undefined) => void
  activeTodo:(todo: undefined) => void
};

export const TodoModal: React.FC<Props> = ({
  user,
  todo,
  hide,
  activeUser,
  activeTodo,
}) => {
  const handleClose = () => {
    hide(false);
    activeUser(undefined);
    activeTodo(undefined);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      { !user?.id ? (
        <Loader />
      ) : (
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
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={user?.email}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
