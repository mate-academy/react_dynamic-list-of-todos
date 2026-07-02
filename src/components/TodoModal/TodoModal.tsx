import React, { useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Loader } from '../Loader';

interface Props {
  todo: Todo;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsUserLoading(true);
    getUser(todo.userId)
      .then(setUser)
      .catch(() => {})
      .finally(() => setIsUserLoading(false));
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card">
        <header className="modal-card-head" data-cy="modal-header">
          <p className="modal-card-title" data-cy="modal-title">
            {todo.title}
          </p>
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            aria-label="close"
            onClick={onClose}
          />
        </header>
        <section className="modal-card-body">
          <p>
            <strong>Title:</strong> {todo.title}
          </p>
          <p>
            <strong>Status:</strong> {todo.completed ? 'Completed' : 'Active'}
          </p>

          <hr />

          {isUserLoading ? (
            <Loader />
          ) : (
            user && (
              <div>
                <p>
                  <strong>User:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
            )
          )}
        </section>
        <footer className="modal-card-foot">
          <button type="button" className="button" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};
