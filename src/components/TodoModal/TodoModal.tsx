import React, { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo,
  onSelectTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
};

export const TodoModal: React.FC<Props> = ({ todo, onSelectTodo }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  useEffect(() => {
    getUser(userId)
      .then(setSelectedUser);
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedUser
        ? (
          <Loader />
        )
        : (
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
                data-cy="modal-close"
                onClick={() => onSelectTodo(null)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                {completed
                  ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}

                {' by '}

                <a href={`mailto:${selectedUser.email}`}>
                  {selectedUser.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
