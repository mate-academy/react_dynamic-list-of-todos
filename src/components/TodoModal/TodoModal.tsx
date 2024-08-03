import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  onClose: (value: null) => void;
  todo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({ onClose, todo }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (todo && todo?.userId) {
      getUser(todo.userId).then(res => {
        setUser(res);
      });
    }
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user?.email ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setUser(null);

                onClose(null);
              }}
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

              <a href={user ? `mailto:${user.email}` : ''}>
                {user ? user?.name : ''}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
