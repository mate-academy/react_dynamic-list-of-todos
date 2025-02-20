import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  onChange: () => void;
  onLoad: () => void;
  isLoading: boolean;
};
export const TodoModal: React.FC<Props> = ({
  todo,
  onChange,
  onLoad,
  isLoading,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(todo.userId)
      .then(setSelectedUser)
      .finally(() => {
        setTimeout(() => {
          onLoad(false);
        }, 300);
      });
  }, [todo.userId, onLoad]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo {todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onChange(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {selectedUser && (
                <a href={`mailto:${selectedUser.email}`}>{selectedUser.name}</a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
