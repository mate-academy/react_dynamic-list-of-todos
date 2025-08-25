import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';

import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { Errors } from '../../types/Errors';

type Props = {
  todo: Todo | null;
  handleIsModal: () => void;
};
export const TodoModal: React.FC<Props> = ({ todo, handleIsModal }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!todo) {
      setCurrentUser(null);

      return;
    }

    setIsLoading(true);

    const fetchUser = async () => {
      try {
        const fetchedUser = await getUser(todo.userId);

        setCurrentUser(fetchedUser);
        setIsLoading(false);
      } catch (e) {
        setError(Errors.User);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [todo]);

  if (!todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoading && <Loader />}
      {error && <p className="has-text-danger">{error}</p>}
      {currentUser && !error && !isLoading && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleIsModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${currentUser?.email}`}>{currentUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
