import * as React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type TodoModalProps = {
  todo: Todo;
  onClose?: () => void;
};

export const TodoModal: React.FC<TodoModalProps> = ({ todo, onClose }) => {
  const [loadingUser, setLoadingUser] = React.useState(true);
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    getUser(todo.userId)
      .then(setUser)
      .catch(() => {
        alert('Failed to fetch user');
      })
      .finally(() => {
        setLoadingUser(false);
      });
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
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

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <span>
                  <strong className="has-text-success">Done</strong>
                  {` by ${user?.name}`}
                </span>
              ) : (
                <span>
                  <strong className="has-text-danger">Planned</strong>
                  {` by ${user?.name}`}
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
