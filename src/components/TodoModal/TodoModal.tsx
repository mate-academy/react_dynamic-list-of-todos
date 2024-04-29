import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  activeTodo: Todo;
  setActiveTodo: (currentTodo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({ activeTodo, setActiveTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    if (activeTodo.id) {
      setUserLoading(true);
    }

    getUser(activeTodo.userId)
      .then(setUser)
      .catch(() => {
        throw new Error('Failed to fetch user');
      })
      .finally(() => setUserLoading(false));
  }, [activeTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user || userLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${activeTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setActiveTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {activeTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {activeTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
