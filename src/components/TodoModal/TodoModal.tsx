import React, { useCallback, useEffect, useState } from 'react';

import { getUser } from '../../api';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import { Loader } from '../Loader';

interface Props {
  selectedTodo: Todo,
  onClose: () => void,
}

export const TodoModal: React.FC<Props> = ({ selectedTodo, onClose }) => {
  const {
    id,
    userId,
    title,
    completed,
  } = selectedTodo;

  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [userErrorMessage, setUserErrorMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUser(userId);

        setUser(fetchedUser);
        setIsUserLoaded(true);
      } catch {
        setUserErrorMessage('Load data is failed. Please try again later.');
      } finally {
        setIsUserLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleBackgroundClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <div
      className="modal is-active"
      data-cy="modal"
    >
      <div
        className="modal-background"
        onClick={handleBackgroundClick}
        role="button"
        tabIndex={0}
        aria-hidden="true"
      />

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

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
              aria-label="Close modal"
            />
          </header>

          <div className="modal-card-body">
            {isUserLoaded ? (
              <>
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

                  <a href={`mailto:${user?.email}`}>
                    {user?.name}
                  </a>
                </p>
              </>
            ) : (
              <>
                {userErrorMessage && (
                  <p className="block">
                    <strong className="has-text-danger">
                      {userErrorMessage}
                    </strong>
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
