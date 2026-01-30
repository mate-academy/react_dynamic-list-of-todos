import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC<{
  postId: number;
  onClose: () => void;
  todos: Todo[];
}> = ({ postId, onClose, todos }) => {
  const [modalLoading, setModalLoading] = React.useState(true);
  const [user, setUser] = React.useState<User | null>(null);

  const currentTodo = todos.find(todo => todo.id === postId);

  const userId = currentTodo?.userId;

  useEffect(() => {
    if (userId) {
      setUser(null);
      setModalLoading(true);
      getUser(userId)
        .then(setUser)
        .catch(() => {
          // Error loading user
        })
        .finally(() => {
          setModalLoading(false);
        });
    } else {
      setModalLoading(false);
    }
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {modalLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{postId}
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
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
