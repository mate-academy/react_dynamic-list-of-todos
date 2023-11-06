import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  displayedTodo: Todo | null;
  changeShowing: (number: number) => void;
}

export const TodoModal: React.FC<Props> = ({
  displayedTodo,
  changeShowing,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUsers] = useState(false);

  useEffect(() => {
    if (displayedTodo !== null) {
      setLoadingUsers(true);
      getUser(displayedTodo?.userId)
        .then((selectedUser) => setUser(selectedUser))
        .finally(() => setLoadingUsers(false));
    }
  }, [displayedTodo]);

  return displayedTodo ? (
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
              {`Todo #${displayedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => changeShowing(-1)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {displayedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={cn({
                'has-text-danger': !displayedTodo?.completed,
                'has-text-success': displayedTodo?.completed,
              })}
              >
                {!displayedTodo?.completed ? 'Planned' : 'Done'}
              </strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  )
    : null;
};
