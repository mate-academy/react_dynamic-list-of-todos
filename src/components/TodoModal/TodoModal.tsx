import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { getUser } from '../../api';

interface TodoWithUser extends Todo {
  user: User;
  todo: Todo;
}

type Props = {
  todoWithUser: TodoWithUser;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todoWithUser, onClose }) => {
  const { id, title, completed, userId } = todoWithUser || {};
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUser(userId)
      .then(users => {
        setUser(users);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

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
            {isLoading ? 'Loading...' : `Todo #${id}`}
          </div>

          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={onClose}
          />
        </header>

        <div className="modal-card-body">
          {isLoading ? (
            <Loader />
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};
