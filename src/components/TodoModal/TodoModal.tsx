import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  todo: Todo,
  selectTodo: (id: number) => void;
};
export const TodoModal: React.FC<Props> = ({ todo, selectTodo }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUserFromServer = async () => {
      const userFromServer = await getUser(todo.userId);

      setUser(userFromServer);
    };

    getUserFromServer()
      .catch(Error);
  }, []);

  return (
    <div
      className={cn(
        'modal',
        {
          'is-active': todo,
        },
      )}
      data-cy="modal"
    >
      <div className="modal-background" />
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

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
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
