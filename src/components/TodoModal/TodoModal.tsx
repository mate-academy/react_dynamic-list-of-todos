/* eslint-disable no-alert */
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    id,
    title,
    userId,
    completed,
  } = todo;

  const fetchUser = useCallback(async () => {
    setIsLoading(true);

    try {
      const fetchedUser = await getUser(userId);

      setUser(fetchedUser);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert('Unexpected error');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoading
        ? <Loader />
        : (
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
                <strong className={
                  classNames({
                    'has-text-success': completed,
                    'has-text-danger': !completed,
                  })
                }
                >
                  {completed ? 'Done' : 'Planned'}
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
