import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  userId: number | null;
  handleUserId: React.Dispatch<React.SetStateAction<number | null>>;
  todo: Todo | null;
  handleTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
};

export const TodoModal: React.FC<Props> = ({
  userId,
  handleUserId,
  todo,
  handleTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);

      getUser(userId)
        .then(setUser)
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userId]);

  return (
    (loading || user) && (
      <div
        className={cn('modal', 'is-active')}
        data-cy="modal"
      >
        <div className="modal-background" />

        {(loading) ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #
                {todo?.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => {
                  setUser(null);
                  handleUserId(null);
                  handleTodo(null);
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong className={cn(todo?.completed
                  ? 'has-text-success'
                  : 'has-text-danger')}
                >
                  {todo?.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${user?.email}`}>
                  {user?.name}
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    )
  );
};
