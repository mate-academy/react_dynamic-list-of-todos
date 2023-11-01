import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  setActiveTodo: (activeTodo: Todo | null) => void;
  activeTodo: Todo | null;
  activeTodoUserId: number | null;
}

export const TodoModal: React.FC<Props> = ({
  setActiveTodo,
  activeTodo,
  activeTodoUserId,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (activeTodoUserId) {
      getUser(activeTodoUserId).then(setUser);
    }
  }, [activeTodoUserId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${activeTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setActiveTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {activeTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={cn(
                {
                  'has-text-success': activeTodo?.completed,
                  'has-text-danger': !activeTodo?.completed,
                },
              )}
              >
                {activeTodo?.completed
                  ? 'Done'
                  : 'Planned'}
              </strong>

              {' by '}

              <a href={user.email}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
