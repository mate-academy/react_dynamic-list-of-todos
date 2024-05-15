import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import { Loader } from '../Loader';

type Props = {
  todo: Todo;
  user: User | null;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, user, onClose }) => (
  <div className="modal is-active" data-cy="modal">
    <div className="modal-background" />

    {user ? (
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{todo.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={onClose}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {todo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {/* <strong className="has-text-success">Done</strong> */}
            <strong
              className={`has-text-${todo.completed ? 'success' : 'danger'}`}
            >
              {todo.completed ? 'Done' : 'Planned'}
            </strong>

            {' by '}

            <a href={`mailto:${user.email}`}>{user.name}</a>
          </p>
        </div>
      </div>
    ) : (
      <Loader />
    )}
  </div>
);
