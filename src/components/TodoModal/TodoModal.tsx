import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo;
  setSelectedTodo: (value: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = React.memo(({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userFromServer = await getUser(selectedTodo.userId);

        setCurrentUser(userFromServer);
      } catch (error) {
        setHasError(true);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!currentUser ? (
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

            <button
              aria-label="Close modal"
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

            {hasError
              ? <span>No user on server</span>
              : (
                <p className="block" data-cy="modal-user">
                  {selectedTodo.completed
                    ? <strong className="has-text-success">Done</strong>
                    : <strong className="has-text-danger">Planned</strong>}

                  {' by '}

                  <a href={`mailto:${currentUser.email}`}>
                    {currentUser.name}
                  </a>
                </p>
              )}
          </div>
        </div>
      )}
    </div>
  );
});
