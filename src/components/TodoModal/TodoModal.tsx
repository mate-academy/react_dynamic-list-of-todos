import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  todo: Todo
  reset: () => void
};

export const TodoModal: React.FC<Props> = ({ todo, reset }) => {
  const [activeUser, setActiveUser] = useState<User>();

  useEffect(() => {
    getUser(todo.userId).then(user => setActiveUser(user));
  }, [todo.id]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!activeUser && (<Loader />)}

      {activeUser && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>

            <button
              type="button"
              aria-label="delete"
              className="delete"
              data-cy="modal-close"
              onClick={reset}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed
                ? (
                  <strong className="has-text-success">
                    Done
                  </strong>
                )
                : (
                  <strong className="has-text-danger">
                    Planned
                  </strong>
                )}

              {' by '}

              <a href={`mailto:${activeUser.email}`}>
                {activeUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
