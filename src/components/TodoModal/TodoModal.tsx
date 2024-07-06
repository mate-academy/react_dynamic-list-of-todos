import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type TodoModalProps = {
  todo: Todo;
  onHideModal: () => void;
};

export const TodoModal: React.FC<TodoModalProps> = ({ todo, onHideModal }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(todo.userId)
      .then(setUser)
      .catch(error => new Error(error.message));
  }, [todo.userId]);

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
              Todo #{todo.id}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onHideModal}
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

              <a href={`mailto:${user?.email}}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
