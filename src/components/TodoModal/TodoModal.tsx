import { FC, useState, useEffect } from 'react';
import cn from 'classnames';

import { getUser } from '../../api';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import { Loader } from '../Loader';

interface Props {
  todo: Todo;
  onClose: () => void;
}

export const TodoModal: FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id, title, completed, userId } = todo;

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    getUser(userId)
      .then(setUser)
      .then(() => setIsLoading(status => !status));
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

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={cn({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
                })}
              >
                {completed ? 'Done' : 'Planned'}
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
