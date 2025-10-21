import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import type { Todo } from '../../types/Todo';
import type { User } from '../../types/User';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      setUserError(null);
      setUser(null);
      setLoadingUser(true);
      try {
        const data = await getUser(todo.userId);

        if (active) {
          setUser(data);
        }
      } catch (e) {
        if (active) {
          setUserError((e as Error).message || 'Failed to load user');
        }
      } finally {
        if (active) {
          setLoadingUser(false);
        }
      }
    };

    loadUser();

    return () => {
      active = false;
    };
  }, [todo.userId]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      className="modal is-active"
      data-cy="modal"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-background" onClick={onClose} />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${todo.id}`}
          </div>

          <button
            type="button"
            className="delete"
            aria-label="close"
            data-cy="modal-close"
            onClick={onClose}
          />
        </header>

        <section className="modal-card-body">
          {loadingUser && <Loader />}

          {!loadingUser && userError && (
            <p className="notification is-danger" data-cy="userError">
              {userError}
            </p>
          )}

          {!loadingUser && !userError && user && (
            <>
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todo.completed ? 'Done' : 'Planned'}
                </strong>
                {' by '}
                <a href={`mailto:${user.email}`}>{user.name}</a>
              </p>
            </>
          )}
        </section>

        <footer className="modal-card-foot is-justify-content-flex-end">
          <button type="button" className="button" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};
