import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo | null;
  setModalOpen: (val: boolean) => void;
  resetSelectedTodo: (val: Todo | null) => void;
}

export const TodoModal: React.FC<Props> = ({
  setModalOpen,
  todo,
  resetSelectedTodo,
}) => {
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (todo) {
      getUser(todo.userId)
        .then(setFetchedUser)
        .catch(err => {
          setError(`Error fetching user: ${err.message}`);
          setFetchedUser(null);
        });
    }
  }, [todo]);

  const handleCloseModal = () => {
    setModalOpen(false);
    resetSelectedTodo(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {fetchedUser === null ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            {error ? (
              <p className="has-text-danger">{error}</p>
            ) : (
              <>
                <p className="block" data-cy="modal-title">
                  {todo?.title}
                </p>

                <p className="block" data-cy="modal-user">
                  <strong
                    className={
                      todo?.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {todo?.completed ? 'Done' : 'Planned'}
                  </strong>
                  {' by '}
                  <a href={`mailto:${fetchedUser?.email}`}>
                    {fetchedUser?.name}
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
