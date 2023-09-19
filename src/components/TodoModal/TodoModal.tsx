import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  todo: Todo;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setIsUserLoading(true);
    getUser(todo.userId)
      .then(user => {
        setCurrentUser(user);
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => setIsUserLoading(false));
  }, []);

  const { title, completed, id } = todo;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isUserLoading ? (
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
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${currentUser?.email}`}>
                {currentUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
