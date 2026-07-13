import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  onClose: (value: Todo | undefined) => void;
  todo: Todo;
}

export const TodoModal: React.FC<Props> = ({ onClose, todo }) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setIsError] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    setIsError('');
    getUser(todo.userId)
      .then(setUser)
      .catch(err => setIsError(err.message))
      .finally(() => setIsLoading(false));
  }, [todo.userId]);

  return (
    <div className={classNames('modal', 'is-active')} data-cy="modal">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{todo.id}
          </div>

          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => onClose(undefined)}
          />
        </header>

        <div className="modal-card-body">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <p className="has-text-danger block">{error}</p>
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {todo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}
                {' by '}
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
