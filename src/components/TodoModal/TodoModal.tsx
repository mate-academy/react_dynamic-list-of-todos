import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  todo: Todo | null,
  selectTodo: (id: number) => void;
};
export const TodoModal: React.FC<Props> = ({ todo, selectTodo }) => {
  const [user, setUser] = useState<User>();
  const [userUploadError, setUserUploadError] = useState(false);
  const status = todo?.completed ? 'Done' : 'Planned';

  const getUserFromServer = async () => {
    try {
      if (todo) {
        const userFromServer = await getUser(todo.userId);

        setUser(userFromServer);
      }
    } catch (error) {
      setUserUploadError(true);
    }
  };

  useEffect(() => {
    getUserFromServer();
  }, []);

  return (
    <div
      className={cn(
        'modal',
        { 'is-active': todo },
      )}
      data-cy="modal"
    >
      <div className="modal-background" />
      {!user || !todo
        ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todo.id}`}
              </div>

              <button
                aria-label="delete-button"
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => {
                  selectTodo(0);
                }}
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
                  {status}
                </strong>
                {' by '}
                {userUploadError
                  ? <p>Unknown user</p>
                  : (
                    <a href={`mailto:${user.email}`}>
                      {user.name}
                    </a>
                  )}
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
