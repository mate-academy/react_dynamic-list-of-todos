import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import classNames from 'classnames';

interface Props {
  todo: Todo;
  user: User | null;
  loading: boolean;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({
  todo,
  user,
  loading,
  onClose,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <div className="modal-card">
        {loading ? (
          <Loader />
        ) : (
          <>
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{todo.id}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={onClose}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={classNames({
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
                  'Unknown user'
                )}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
