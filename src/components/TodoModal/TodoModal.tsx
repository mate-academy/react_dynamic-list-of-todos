import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo;
  onClose: () => void;
};
export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getUser(todo.userId)
    .then(u => {
      setSelectedUser(u);
    })
    .catch(() => setError(true));
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {selectedUser ? (
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
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${selectedUser.email}`}>{selectedUser.name}</a>
            </p>
          </div>
        </div> 
      ) : error ? (
        <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Something went wrong
          </div>
          <button
            onClick={onClose}
            type="button"
            className="delete"
            data-cy="modal-close"
          />
        </header>
      </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

