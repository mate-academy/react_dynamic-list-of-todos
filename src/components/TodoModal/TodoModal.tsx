import React, { useEffect, useState } from 'react';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import { getUser } from '../../api';
import { Loader } from '../Loader/Loader';

interface Props {
  todo: Todo;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    setUser(null);
    setIsLoading(true);

    getUser(todo.userId)
      .then(data => {
        if (mounted) {
          setUser(data);
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head" data-cy="modal-header">
          <p className="modal-card-title" data-cy="modal-title">
            {todo.title}
          </p>

          <button
            type="button"
            className="delete"
            aria-label="close"
            onClick={onClose}
            data-cy="modal-close"
          />
        </header>

        <section className="modal-card-body">
          <p>
            <strong>Title:</strong> {todo.title}
          </p>

          <p>
            <strong>Status:</strong> {todo.completed ? 'Completed' : 'Active'}
          </p>

          {isLoading && <Loader />}

          {user && (
            <div>
              <p>
                <strong>User:</strong> {user.name}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
