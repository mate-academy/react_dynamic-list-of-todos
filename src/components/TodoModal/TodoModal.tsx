import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  setISOpenModal: (isOpenModal: boolean) => void
  selectedTodo: Todo | null
  clearTodo: () => void
};

export const TodoModal: React.FC<Props> = (
  {
    setISOpenModal, selectedTodo, clearTodo,
  },
) => {
  const [user, setUser] = useState<User | null>(null);
  const [isError, setIsError] = useState(false);

  const userGet = async () => {
    try {
      const arrUser = await getUser(selectedTodo?.userId || 0);

      setUser(arrUser);
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    userGet();
  }, []);

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
                setISOpenModal(false);
                clearTodo();
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            {isError && (
              <h2 style={{ color: 'red' }}>
                An error occured while user loading
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
