import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  todo: Todo;
  onClosed: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, onClosed }) => {
  const [users, setUsers] = useState<User | null>(null);
  const [hasError, sethasError] = useState(false);

  useEffect(() => {
    getUser(todo.userId)
      .then((userData) => {
        setUsers(userData);
      })
      .catch(() => sethasError(true));
  }, [todo.userId]);

  if (hasError) {
    <div className="notification is-danger">
      <span className="icon is-centered">
        <i className="fa fa-exclamation-triangle" />
      </span>
      ---Catch error Can`t found users---
    </div>;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!users ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClosed}
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

              <a href={`mailto:${users.email}`}>{users.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
