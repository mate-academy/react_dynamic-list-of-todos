import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getUser(todo.userId)
      .then(setUser)
      .catch(() => {
        setErrorMessage('Can not load user data');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

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
          {errorMessage && (
            <div className="notification is-danger is-light">
              {errorMessage}
            </div>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <>
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
                  {todo.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
