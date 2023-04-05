import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo | null;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);

    try {
      const fetchedUser = await getUser(todo?.userId || 0);

      setUser(fetchedUser);
    } catch (error) {
      throw new Error('Something went wrong...');
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
                {`Todo #${todo?.id}`}
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
                {todo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong className={
                  classNames({
                    'has-text-success': todo?.completed,
                    'has-text-danger': !todo?.completed,
                  })
                }
                >
                  {todo?.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                {user && (
                  <a href={`mailto:${user.email}`}>
                    {user.name}
                  </a>
                )}
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
