import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo;
  onReset: () => void;
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, onReset }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getUser(selectedTodo.userId)
      .then(userData => {
        setUser(userData);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch user data. Please try again later.');
        setIsLoading(false);
      });
  }, [selectedTodo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${selectedTodo.id}`}
          </div>

          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={onReset}
            aria-label="close"
          />
        </header>

        <div className="modal-card-body">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <p className="has-text-danger" data-cy="modal-error">
              {error}
            </p>
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                {selectedTodo.title}
              </p>
              <p className="block" data-cy="modal-user">
                {selectedTodo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
