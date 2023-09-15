import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { TodoContext } from '../TodoContext';

export const TodoModal: React.FC = () => {
  const [showedUser, setShowedUser] = useState<User | null>(null);
  const { showedTodo, setShowedTodo } = useContext(TodoContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (showedTodo?.userId) {
      setIsLoading(true);
      getUser(showedTodo.userId)
        .then(setShowedUser)
        .catch(() => setShowedUser(null))
        .finally(() => setIsLoading(false));
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${showedTodo?.id}`}
            </div>

            <button
              aria-label="deleteButton"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setShowedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {showedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-success': showedTodo?.completed,
                  'has-text-danger': !showedTodo?.completed,
                })}
              >
                {showedTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${showedUser?.email}`}>
                {showedUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
