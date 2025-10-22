import React from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  user?: User;
  todo: Todo;
  loading: boolean;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  user,
  loading,
  todo,
  onClose,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
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
              onClick={() => onClose()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              {user ? (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              ) : (
                <span />
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
