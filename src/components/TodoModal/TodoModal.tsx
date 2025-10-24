import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface TodoModalProps {
  selectedTodo: Todo;
  handleModalClose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  selectedTodo,
  handleModalClose: onClose,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        setIsUserLoading(true);
        setError(null);

        const fetchedUser = await getUser(selectedTodo.userId, {
          signal: controller.signal,
        });

        setCurrentUser(fetchedUser);
      } catch (err: unknown) {
        if ((err as { name?: string }).name === 'AbortError') {
          return;
        }

        setError('Failed to load user info.');
      } finally {
        setIsUserLoading(false);
      }
    };

    fetchUser();

    return () => {
      controller.abort();
    };
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} aria-hidden="true" />

      <div className="modal-card">
        <header className="modal-card-head">
          <p
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{selectedTodo.id}
          </p>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={onClose}
          />
        </header>

        <section className="modal-card-body">
          {isUserLoading ? (
            <Loader />
          ) : error ? (
            <p className="has-text-danger">{error}</p>
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                <strong>{selectedTodo.title}</strong>
              </p>

              <p className="block" data-cy="modal-user">
                {selectedTodo.completed ? (
                  <span className="has-text-success">Done</span>
                ) : (
                  <span className="has-text-danger">Planned</span>
                )}
                {' by '}
                {currentUser && (
                  <a href={`mailto:${currentUser.email}`}>{currentUser.name}</a>
                )}
              </p>
            </>
          )}
        </section>

        <footer className="modal-card-foot">
          <button className="button is-link" type="button" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};
