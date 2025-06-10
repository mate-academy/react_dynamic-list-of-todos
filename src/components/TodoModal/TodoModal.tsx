import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { useUser } from '../../hooks/useUser';

interface ToDoModalProps {
  isLoading: boolean;
  onClose: () => void;
  selectedTodo: Todo;
}

export const TodoModal: React.FC<ToDoModalProps> = ({
  selectedTodo,
  onClose,
}) => {
  const userQuery = useUser(selectedTodo.userId);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {userQuery.isLoading ? (
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
              onClick={() => onClose()}
            />
          </header>

          <div className="modal-card-body">
            <>
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
                {userQuery.data && (
                  <a href={`mailto:${userQuery.data.email}`}>
                    {userQuery.data.name}
                  </a>
                )}
              </p>
            </>
          </div>
        </div>
      )}
    </div>
  );
};
