import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  modal: Todo,
  deleteModal: () => void
  updateErrorMessage: (error: string) => void
};

export const TodoModal: React.FC<Props> = ({
  modal,
  deleteModal,
  updateErrorMessage,
}) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const {
    id,
    title,
    completed,
    userId,
  } = modal;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateErrorMessage('Request timed out');
      setIsLoading(false);
    }, 3000);

    getUser(userId)
      .then(userData => {
        clearTimeout(timeoutId);
        setUser(userData);
        setIsLoading(false);
      })
      .catch(error => {
        clearTimeout(timeoutId);
        updateErrorMessage(`Error fetching user data. ${error}`);
        setIsLoading(false);
      });
  }, [modal]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      {user && (
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
              aria-label="modal-close"
              onClick={deleteModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={classNames({
                'has-text-danger': !completed,
                'has-text-success': completed,
              })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>
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
