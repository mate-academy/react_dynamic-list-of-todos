import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface Props {
  onClose: (v: Todo | null) => void;
  activeTodo: Todo;
}
export const TodoModal: React.FC<Props> = ({ onClose, activeTodo }) => {
  const handleClick = (): void => {
    onClose(null);
  };

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setUser(null);
    getUser(activeTodo.userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [activeTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{activeTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              aria-label="Close modal"
              className="delete"
              data-cy="modal-close"
              onClick={handleClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {activeTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames(
                  activeTodo.completed ? 'has-text-success' : 'has-text-danger',
                )}
              >
                {activeTodo.completed ? 'Done' : 'Planned'}
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
