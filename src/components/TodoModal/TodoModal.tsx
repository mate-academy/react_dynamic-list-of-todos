import React, { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo;
  onModalClose?: () => void;
};

const TodoModalBase: React.FC<Props> = ({ todo, onModalClose = () => {} }) => {
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getUser(todo.userId)
      .then(setUser)
      .catch(e => setErrorMessage(e.message || 'Something went wrong!'))
      .finally(() => setIsLoading(false));
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>
            <button
              onClick={onModalClose}
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
              {todo.completed && (
                <strong className="has-text-success">Done</strong>
              )}
              {!todo.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {errorMessage && (
                <div className="notification is-danger">{errorMessage}</div>
              )}
              {user && !errorMessage && (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export const TodoModal = React.memo(TodoModalBase);
