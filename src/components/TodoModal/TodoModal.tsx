import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  activeTodo: Todo,
  setActiveTodoId: React.Dispatch<React.SetStateAction<number>>,
}

export const TodoModal: React.FC<Props> = ({ activeTodo, setActiveTodoId }) => {
  const [user, setUser] = useState<User>();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getActiveUser = async () => {
      try {
        const userFromServer = await getUser(activeTodo.userId);

        setUser(userFromServer);
      } catch {
        setHasError(true);
      }
    };

    getActiveUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {(!user || hasError) ? (
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

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="close"
              onClick={() => setActiveTodoId(0)}
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
