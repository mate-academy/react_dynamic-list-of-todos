import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo
  selectTodo: (id: number) => void;
};

export const TodoModal: React.FC<Props> = ({ selectTodo, todo }) => {
  const [user, setUser] = useState<User>();
  const [handleError, setHandleError] = useState(false);

  const fetchUser = async () => {
    try {
      const userFromServer = await getUser(todo.userId);

      setUser(userFromServer);
    } catch (error) {
      setHandleError(true);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div
      className={classNames('modal', { 'is-active': todo })}
      data-cy="modal"
    >
      <div className="modal-background" />
      {handleError
       && <p>No server respone</p>}

      {!user
        ? (
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

              <button
                type="button"
                aria-label="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => selectTodo(0)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {todo.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

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
