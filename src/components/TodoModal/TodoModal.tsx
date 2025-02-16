import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import cn from 'classnames';

type Props = {
  task: Todo;
  onCloseTaskModal: () => void;
};

export const TodoModal: React.FC<Props> = ({ task, onCloseTaskModal }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    onCloseTaskModal();
  };

  useEffect(() => {
    setIsLoading(true);
    getUser(task.userId)
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, [task]);

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
              Todo #{task?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handleCloseModal}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {task.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn('block', {
                  'has-text-success': task.completed,
                  'has-text-danger': !task.completed,
                })}
              >
                {task.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
