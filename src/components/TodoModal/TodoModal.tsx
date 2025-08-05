import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { useUsers } from '../../hooks/useUsers';

interface TodoModalProps {
  selectedTodo: Todo;
  onModalClose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  selectedTodo,
  onModalClose,
}) => {
  const userQuery = useUsers(selectedTodo.userId);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {userQuery.loading ? (
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

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onModalClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {userQuery.data && (
                <a href={`mailto:${userQuery.data.email}`}>
                  {userQuery.data?.name}
                </a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
