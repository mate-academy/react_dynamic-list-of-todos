import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import * as todosAPI from '../../api/api';
import { User } from '../../types/User';

type TodoModalProps = {
  selectionTodo: Todo | null;
  onClose: () => void;
};

export const TodoModal: React.FC<TodoModalProps> = ({
  selectionTodo,
  onClose,
}) => {
  const [modalLoader, setModalLoader] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!selectionTodo) {
      return;
    }

    setModalLoader(true);

    todosAPI
      .getUser(selectionTodo.userId)
      .then(setUser)
      .finally(() => setModalLoader(false));
  }, [selectionTodo]);

  if (!selectionTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {modalLoader ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectionTodo.id}`}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectionTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectionTodo?.completed ? (
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
