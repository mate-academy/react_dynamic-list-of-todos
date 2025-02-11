import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  activeTodo: Todo;
  onCloseTodoCard: (p: React.MouseEvent) => void;
};

export const TodoModal: React.FC<Props> = ({ activeTodo, onCloseTodoCard }) => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    getUser(activeTodo.userId)
      .then(res => setUser(res))
      .catch(() => {
        throw new Error('User not found');
      })
      .finally(() => setLoadingUser(false));
  }, [activeTodo.userId]);

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
              Todo #{activeTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              aria-label="Close todo card"
              className="delete"
              data-cy="modal-close"
              onClick={onCloseTodoCard}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {activeTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames({
                  'has-text-success': activeTodo.completed,
                  'has-text-danger': !activeTodo.completed,
                })}
              >
                {activeTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
