import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

interface TodoModalProps {
  todo: Todo;
  closeModal: () => void;
}
export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  closeModal,
}: TodoModalProps) => {
  const [loading, setLoading] = useState(Boolean);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setLoading(true);

    getUser(todo?.userId || 0)
      .then(foundUser => {
        setUser(foundUser);
        setLoading(false);
      });
  }, []);

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
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed
                ? <strong className="has-text-danger">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
