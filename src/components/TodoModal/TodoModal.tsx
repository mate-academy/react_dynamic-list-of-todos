import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface TodoWithUser extends Todo {
  user: User;
}

type Props = {
  todoWithUser: TodoWithUser | null;
  loadingUser: boolean;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todoWithUser,
  loadingUser,
  onClose,
}) => {
  const { id, title, completed, user } = todoWithUser || {};
  const { name, email } = user || {};

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {loadingUser ? 'Loading...' : `Todo #${id}`}
          </div>

          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={onClose}
          />
        </header>

        <div className="modal-card-body">
          {loadingUser ? (
            <Loader />
          ) : (
            todoWithUser && (
              <>
                <p className="block" data-cy="modal-title">
                  {title}
                </p>

                <p className="block" data-cy="modal-user">
                  <strong
                    className={classNames({
                      'has-text-success': completed,
                      'has-text-danger': !completed,
                    })}
                  >
                    {completed ? 'Done' : 'Planned'}
                  </strong>

                  {' by '}

                  <a href={`mailto:${email}`}>{name}</a>
                </p>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};
