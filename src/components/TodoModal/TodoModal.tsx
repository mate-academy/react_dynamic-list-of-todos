import React, { useEffect, useState } from 'react';
import className from 'classnames';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

import { Loader } from '../Loader';

type Props = {
  todo: Todo,
  onClose: () => void
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const {
    id,
    title,
    completed,
  } = todo;
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    getUser(todo.userId).then(data => {
      setUser(data);
    });
  }, []);

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
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              onClick={onClose}
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={className({
                'has-text-danger': !completed,
                'has-text-success': completed,
              })}
              >
                {completed
                  ? 'Done'
                  : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
