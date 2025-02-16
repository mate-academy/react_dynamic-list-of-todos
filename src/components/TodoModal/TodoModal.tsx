import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  currentTodo: Todo;
  closeModal: () => void;
};

export const TodoModal: React.FC<Props> = ({ currentTodo, closeModal }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoaderActive, setIsLoaderActive] = useState(false);

  useEffect(() => {
    setIsLoaderActive(true);
    getUser(currentTodo.userId)
      .then(setCurrentUser)
      .finally(() => setIsLoaderActive(false));
  }, [currentTodo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoaderActive ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {currentTodo.id ? `Todo #${currentTodo.id}` : ''}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={currentUser?.email}>{currentUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
