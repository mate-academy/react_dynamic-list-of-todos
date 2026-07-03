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
    setUser(null);
    getUser(todo.userId)
      .then(setUser)
      .catch(() => {})
      .finally(() => setIsUserLoading(false));
  }, [todo.userId]);

  return (
    <div
      className="modal is-active"
      data-cy="modal"
      style={{ display: 'flex' }}
    >
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title" data-cy="modal-header">
            Todo #{todo.id}
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
          <div data-cy="modal-title">
            <p>{todo.title}</p>
          </div>

          <hr />

          {isUserLoading ? (
            <Loader />
          ) : (
            user && (
              <div data-cy="modal-user">
                {todo.completed ? 'Done' : 'Planned'} by {user.name}
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
