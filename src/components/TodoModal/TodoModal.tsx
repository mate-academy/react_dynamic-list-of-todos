/* eslint-disable no-console */
import cn from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUserFromServer } from '../../utils/helpers';
import { Loader } from '../Loader';

type Props = {
  todo: Todo,
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const [user, setUser] = useState<User | null>(null);

  getUserFromServer(userId, setUser);

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

            <button
              aria-label="modal-close"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn({
                  'has-text-danger': !completed,
                  'has-text-success': completed,
                })}
              >
                {completed ? 'Done' : 'Planned'}
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
