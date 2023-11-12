import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  handleCloseModal: () => void;
  selectedTodo: Todo;
};

export const TodoModal: React.FC<Props> = (
  {
    handleCloseModal,
    selectedTodo,
  },
) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then(setUser);
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
              <span>
                {`Todo #${selectedTodo.id}`}
              </span>
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              {user ? (
                <a href={`mailto:${user.email}`} data-cy="todo">
                  {user.name}
                </a>
              ) : (
                <Loader />
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
