import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  currentTodo: Todo,
  setCurrentTodo: (todo: Todo | null) => void,
}

export const TodoModal: React.FC<Props> = ({
  currentTodo,
  setCurrentTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(currentTodo.userId)
      .then((currentUser) => setUser(currentUser));
  });

  const { id, title, completed } = currentTodo;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user || !currentTodo
        ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${id}`}
              </div>

              <button
                aria-label="delete"
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => setCurrentTodo(null)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                {completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}

                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
