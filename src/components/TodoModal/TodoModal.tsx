import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import cx from 'classnames';

type Props = {
  todo: Todo;
  selectedTodoId?: number;
  onSelect?: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  selectedTodoId,
  onSelect = () => {},
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!todo) {
      return;
    }

    setLoadingUser(true);
    setError('');

    getUser(todo.userId)
      .then(setUser)
      .catch(() => setError('Try again later'))
      .finally(() => setLoadingUser(false));
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{selectedTodoId}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => onSelect(null)}
          />
        </header>

        <div className="modal-card-body">
          {loadingUser ? (
            <Loader />
          ) : error ? (
            <p className="has-text-danger" data-cy="modal-error">
              {error}
            </p>
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>
              <p className="block" data-cy="modal-user">
                <strong
                  className={cx('status', {
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
                  })}
                >
                  {todo.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
