import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { getUser } from '../../api';

interface TodoModalProps {
  selectedTodo: Todo;
  onClose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  selectedTodo,
  onClose,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    setIsUserLoading(true);
    getUser(selectedTodo.userId)
      .then(fetchedUser => {
        setCurrentUser(fetchedUser);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
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
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {currentUser && (
                <a href={`mailto:${currentUser.email}`}>{currentUser.name}</a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
