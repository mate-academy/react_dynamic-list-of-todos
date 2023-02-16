import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  todo: Todo
  clearSelectedTodo: () => void;
}

export const TodoModal: React.FC<Props> = ({
  todo,
  clearSelectedTodo,
}) => {
  const [user, setUser] = useState<User>();
  const [isLoadingError, setIsLoadingError] = useState(false);

  useEffect(() => {
    const getUserFromServer = async () => {
      const userFromServer = await getUser(todo.userId);

      setUser(userFromServer);
    };

    getUserFromServer()
      .catch(() => setIsLoadingError(true));
  }, []);

  return (
    <div
      className={classNames(
        'modal',
        {
          'is-active': todo,
        },
      )}
      data-cy="modal"
    >
      <div className="modal-background" />

      {!user
        ? (isLoadingError && <p>Error, server is unavailable</p>) || <Loader />
        : (
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
                onClick={clearSelectedTodo}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {todo.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong> }

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
