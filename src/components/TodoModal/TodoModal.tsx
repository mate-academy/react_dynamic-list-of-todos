import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

interface TodoModalClose {
  todo: Todo;
  onClose: () => void;
}

export const TodoModal: React.FC<TodoModalClose> = ({ todo, onClose }) => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoadingUser(true);
      const fetchedTodos = await getUser(todo.userId);

      setUser(fetchedTodos);
      setLoadingUser(false);
    };

    fetchUser();
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {loadingUser ? (
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
              {todo.title}
            </p>

            {todo.completed ? (
              <p className="block" data-cy="modal-user">
                <strong>Done by {user ? user.name : 'Unknown'}</strong>
              </p>
            ) : (
              <p className="block" data-cy="modal-user">
                <strong>Planned by {user ? user.name : 'Unknown'}</strong>
              </p>
            )}

            <p className="block" data-cy="modal-status">
              <strong
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
