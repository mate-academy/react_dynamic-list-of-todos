import React, { useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  onSetUserId: (userId: number) => void
  selectedTodo: Todo
};

export const TodoModal: React.FC<Props> = ({ onSetUserId, selectedTodo }) => {
  const [user, setUser] = useState<User>();

  const {
    userId,
    id,
    title,
    completed,
  } = selectedTodo;

  getUser(userId).then(person => setUser(person));

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
              type="button"
              aria-label="clear"
              className="delete"
              data-cy="modal-close"
              onClick={() => onSetUserId(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames(
                  { 'has-text-danger': !completed },
                  { 'has-text-success': completed },
                )}
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
