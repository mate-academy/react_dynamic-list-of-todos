import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo | null;
  setSelectedTodoId: (id: number) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodoId,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedTodo) {
      setUser(null);

      return;
    }

    setIsLoading(true);
    setError(null);

    getUser(selectedTodo.userId)
      .then(setUser)
      .catch((err) => {
        setError('An error occurred while fetching user data.');
        // eslint-disable-next-line no-console
        console.error('User data fetch error:', err);
      })
      .finally(() => setIsLoading(false));
  }, [selectedTodo]);

  return (
    <div className={`modal ${isLoading ? 'is-active' : ''}`} data-cy="modal">
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
              {selectedTodo ? `Todo #${selectedTodo.id}` : ''}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedTodoId(0)}
            />
          </header>

          <div className="modal-card-body">
            {error ? (
              <p className="has-text-danger" data-cy="modal-error">
                {error}
              </p>
            ) : (
              <>
                <p className="block" data-cy="modal-title">
                  {selectedTodo ? selectedTodo.title : ''}
                </p>

                <p className="block" data-cy="modal-user">
                  {selectedTodo ? (
                    <>
                      <strong
                        className={`has-text-${selectedTodo.completed ? 'success' : 'danger'}`}
                      >
                        {selectedTodo.completed ? 'Done' : 'Planned'}
                      </strong>
                      {' by '}
                      <a href={`mailto:${user?.email}`}>
                        {user?.name}
                      </a>
                    </>
                  ) : ''}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
