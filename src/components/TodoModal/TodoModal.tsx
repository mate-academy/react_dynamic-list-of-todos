import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface Props {
  selectedTodo: Todo,
  onCloseModal: (value: null) => void;
}

export const TodoModal: React.FC<Props> = ({ selectedTodo, onCloseModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const {
    title,
    id,
    userId,
    completed,
  } = selectedTodo;

  useEffect(() => {
    setIsLoading(true);

    getUser(userId)
      .then(setUser)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error loading user:', error);
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
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
              aria-label="Button close modal"
              className="delete"
              data-cy="modal-close"
              onClick={() => onCloseModal(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={cn({
                'has-text-danger': !completed,
                'has-text-success': completed,
              })}
              >
                {completed
                  ? 'Done'
                  : 'Planned'}
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
