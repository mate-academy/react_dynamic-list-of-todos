import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  clearDataModal: ()=> void
  selectedTodo: Todo | null
  setModalOpened: (modalOpened: boolean) => void
};

export const TodoModal: React.FC<Props> = ({
  clearDataModal,
  selectedTodo,
  setModalOpened,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const loadedUser = await getUser(selectedTodo?.userId || 0);

        setUser(loadedUser);
      } catch {
        setError(true);
      }
    };

    loadUser();
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setModalOpened(false);
                clearDataModal();
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            {error && (
              <h2 style={{ color: 'red' }}>
                Loading error
              </h2>
            )}

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={user.email}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
