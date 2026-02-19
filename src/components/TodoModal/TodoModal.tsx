import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Loader } from '../Loader';

interface Props {
  selectedTodo: Todo | null;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = React.memo(
  ({ selectedTodo, onClose }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [loadedTodoId, setLoadedTodoId] = useState<number | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
      if (!selectedTodo) {
        return;
      }

      let isCancelled = false;

      setIsLoadingUser(true);
      setUser(null);
      setLoadedTodoId(null);
      setError('');

      getUser(selectedTodo.userId)
        .then(loadedUser => {
          if (!isCancelled) {
            setUser(loadedUser);
            setLoadedTodoId(selectedTodo.id);
          }
        })
        .catch(() => {
          if (!isCancelled) {
            setError('Failed to load user');
          }
        })
        .finally(() => {
          if (!isCancelled) {
            setIsLoadingUser(false);
          }
        });

      return () => {
        isCancelled = true;
      };
    }, [selectedTodo]);

    if (!selectedTodo) {
      return null;
    }

    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {isLoadingUser ? (
          <Loader />
        ) : error ? (
          <div className="modal-card">
            <header className="modal-card-head">
              <div className="modal-card-title has-text-weight-medium">
                Error
              </div>
              <button type="button" className="delete" onClick={onClose} />
            </header>
            <div className="modal-card-body">
              <p className="notification is-danger">{error}</p>
            </div>
          </div>
        ) : user && loadedTodoId === selectedTodo.id ? (
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

                <a href={`mailto:${user.email}`}>{user.name}</a>
              </p>
            </div>
          </div>
        ) : null}
      </div>
    );
  },
);

TodoModal.displayName = 'TodoModal';
