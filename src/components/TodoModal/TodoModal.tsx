/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  todo: Todo;
  close: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, close }) => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUser(todo.userId)
      .then(setUserDetails)
      .catch(error => console.error('Error fetching userdetails:', error))
      .finally(() => setLoading(false));
  }, [todo.userId]);

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
