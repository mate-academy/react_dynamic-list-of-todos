import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface TodoModalProps {
  todo: Todo;
  onClose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getUser(todo.userId)
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [todo.userId]);

  return (
    <div className="modal-card">
      {loading ? (
        <Loader />
      ) : (
        <>
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
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            {todo.completed ? (
              <p className="block" data-cy="modal-user">
                <strong className="has-text-success">Done</strong>
                <a href={`mailto:${user?.email}`}> {user?.name}</a>
              </p>
            ) : (
              <p className="block" data-cy="modal-user">
                <strong className="has-text-danger">Planned</strong> by
                <a href={`mailto:${user?.email}`}> {user?.name}</a>
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
