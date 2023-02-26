import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  selectedTodo: Todo;
  setSelectedTodo: (value: Todo | null) => void;
}

export const TodoModal: React.FC<Props> = ({
  setSelectedTodo,
  selectedTodo,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUser(selectedTodo.userId);

        setCurrentUser(user);
      } catch {
        setHasError(true);
      }
    }

    fetchUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!currentUser || !selectedTodo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setSelectedTodo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {!hasError
                ? (
                  <a href={`mailto:${currentUser?.email}`}>
                    {currentUser?.name}
                  </a>
                ) : (
                  <strong>Unknown</strong>
                )}
            </p>

            {hasError && (
              <div className="notification is-warning">
                Server error!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
