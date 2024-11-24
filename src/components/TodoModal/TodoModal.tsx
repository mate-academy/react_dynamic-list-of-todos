import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  onResetSelectedTodo: () => void;
  selectedTodo: Todo;
}

export const TodoModal: React.FC<Props> = ({
  onResetSelectedTodo,
  selectedTodo,
}) => {
  const [loadingTodoModal, setLoadingTodoModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setLoadingTodoModal(true);
    getUser(selectedTodo.userId)
      .then(setUser)
      .finally(() => setLoadingTodoModal(false));
  }, [selectedTodo.userId]);

  const handleResetUserAndTodo = () => {
    setUser(null);
    onResetSelectedTodo();
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingTodoModal ? (
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
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleResetUserAndTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
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
