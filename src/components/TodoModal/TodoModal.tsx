import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  modalTodo: Todo;
  setModalTodo: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({ modalTodo, setModalTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getUser(modalTodo.userId)
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, [modalTodo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card" data-cy="loader">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{modalTodo.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="Close modal"
              onClick={() => setModalTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {modalTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {modalTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
