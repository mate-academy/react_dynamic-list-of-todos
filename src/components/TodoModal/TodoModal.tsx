import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useState } from 'react';
import { Todo } from '../../types/Todo';

interface TodoModalProps {
  todo: Todo | undefined;
  onClose: () => void;
}

function getUser(userId: number): Promise<User> {
  return fetch(
    `https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${userId}.json`,
  ).then(response => response.json());
}

export const TodoModal: React.FC<TodoModalProps> = ({ todo, onClose }) => {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (todo) {
      setLoading(true);

      setTimeout(() => {
        getUser(todo.userId)
          .then(setUser)
          .finally(() => {
            setLoading(false);
          });
      }, 1000);
    }
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
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
              onClick={onClose}
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

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
