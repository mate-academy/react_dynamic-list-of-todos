import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cn from 'classnames';
import { Loader } from '../Loader';
import type { User } from '../../types/User';
import type { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  onClose,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const getUser = async (userId: number) => {
    try {
      const userFromServer = await axios.get<User>(
        `https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${userId}.json`,
      );

      setUser(userFromServer.data);
    } catch (error: unknown) {
      setUser(null);
    }
  };

  useEffect(() => {
    getUser(todo.userId);
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {user ? (
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
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={cn({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
