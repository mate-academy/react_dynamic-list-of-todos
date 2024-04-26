import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

interface UserDetails {
  name: string;
  email: string;
}

interface Props {
  todo: Todo;
  close: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, close }) => {
  const [userDetails, setUserDetails] = useState<UserDetails>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${todo.userId}.json`,
        );

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const userData = await response.json();

        setUserDetails(userData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching userdetails:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [todo.userId, setLoading]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{todo.id}
          </div>
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={close}
          />
        </header>
        <div className="modal-card-body">
          {loading ? (
            <Loader />
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>
              {userDetails && (
                <p className="block" data-cy="modal-user">
                  <strong className="has-text-danger">
                    {todo.completed ? 'Done' : 'Planned'}
                  </strong>{' '}
                  by{' '}
                  <a href={`mailto:${userDetails.email}`}>{userDetails.name}</a>
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
