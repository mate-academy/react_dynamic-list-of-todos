import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

type TodoModalProps = {
  selectedTodo: Todo | null;
  handleClose: () => void;
};

export const TodoModal: React.FC<TodoModalProps> = ({
  selectedTodo,
  handleClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{
    id: number;
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    if (selectedTodo) {
      setIsLoading(true);
      getUser(selectedTodo.userId)
        .then(setUser)
        .catch(error)
        .finally(() => setIsLoading(false));
    }
  }, [selectedTodo]);

  if (!selectedTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
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
              Todo #{selectedTodo.id}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>
          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <span className="has-text-success">Done</span>
              ) : (
                <span className="has-text-danger">Planned</span>
              )}

              {' by '}
              {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
