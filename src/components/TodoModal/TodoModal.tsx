import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import { getUser } from '../../api';

interface Props {
  visibleTodo: Todo;
  setVisibleTodo: (todo: Todo | null) => void;
}

export const TodoModal: React.FC<Props> = ({ visibleTodo, setVisibleTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const {
    id, title, completed, userId,
  } = visibleTodo;

  useEffect(() => {
    getUser(userId)
      .then(userFromServer => {
        setUser(userFromServer);
      });
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {!user || !visibleTodo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="Close Medal"
              onClick={() => setVisibleTodo(null)}
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
