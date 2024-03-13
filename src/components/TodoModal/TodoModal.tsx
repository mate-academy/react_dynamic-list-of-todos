import React, { useState } from 'react';

import { Loader } from '../Loader';

import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

import { getUser } from '../../api';

type Props = {
  todo: Todo | null;
  reset: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, reset }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  if (todo) {
    getUser(todo.userId).then(setSelectedUser);
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedUser ? (
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
              onClick={reset}
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

              <a href={`mailto:${selectedUser.email}`}>{selectedUser.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
