import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [userError, setUserError] = useState(false);

  useEffect(() => {
    setIsUserLoading(true);
    getUser(todo.userId)
      .then(userFromServer => {
        setUser(userFromServer);
        setIsUserLoading(false);
      })

      .catch(() => {
        setUserError(true);
        setIsUserLoading(false);
      });
  }, [todo]);

  if (isUserLoading) {
    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />
        <Loader />
      </div>
    );
  }

  if (userError) {
    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title has-text-danger">
              Failed to load user info
            </p>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="has-text-danger">
              Something went wrong while loading user details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

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
            <strong
              className={classNames({
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
              })}
            >
              {todo.completed ? 'Done' : 'Not done'}
            </strong>

            {' by '}

            <a href={`mailto:${user.email}`}>
              {user.name}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
