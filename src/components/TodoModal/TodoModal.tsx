import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  close: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, close }) => {
  const [user, setUser] = useState<User | null>();
  const [isError, setIsError] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    setIsLoadingUser(true);
    getUser(todo.userId)
      .then(setUser)
      .catch(() => setIsError(true))
      .finally(() => setIsLoadingUser(false));
  }, [todo.userId]);

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
              Todo #{todo.id}
            </div>
            <button
              onClick={close}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>
          <div className="modal-card-body">
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
              {isLoadingUser ? (
                <span>Loading user...</span>
              ) : isError ? (
                <span>Error loading user</span>
              ) : (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              )}
            </p>
          </div>
        </div>
      ) : isError ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Something gone wrong
            </div>
            <button
              onClick={close}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
