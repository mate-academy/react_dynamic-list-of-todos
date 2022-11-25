import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  onClose,
}) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const [user, setUser] = useState<User | null>(null);
  const [isUserInfoLoaded, setIsUserInfoLoaded] = useState(false);

  useEffect(() => {
    getUser(userId)
      .then((userFromServer) => {
        setUser(userFromServer);
        setIsUserInfoLoaded(true);
      })
      .catch(error => {
        throw new Error(error);
      });
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isUserInfoLoaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="delete"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
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

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
