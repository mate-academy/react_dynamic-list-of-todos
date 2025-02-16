import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader/Loader';
import { getUser } from '../../api';

interface Props {
  todo: Todo;
  closeModal: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, closeModal }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    setIsLoadingUser(true);
    getUser(todo.userId)
      .then(userData => setUser(userData))
      .finally(() => setIsLoadingUser(false));
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={closeModal} />

      {isLoadingUser ? (
        <Loader />
      ) : (
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
              onClick={closeModal}
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

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
