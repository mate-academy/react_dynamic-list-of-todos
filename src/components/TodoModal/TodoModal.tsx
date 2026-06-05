import React from 'react';
import classNames from 'classnames';

import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface TodoModalProps {
  todo: Todo | null;
  onTodoClose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({ todo, onTodoClose }) => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    if (!todo) {
      return;
    }

    setLoading(true);
    setUser(null);
    getUser(todo.userId).then(loadedUser => {
      setUser(loadedUser);
      setLoading(false);
    });
  }, [todo]);

  if (!todo) {
    return null;
  }

  return (
    <div
      className={classNames('modal', {
        'is-active': todo,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {todo ? `Todo #${todo?.id}` : 'Todo'}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onTodoClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
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
