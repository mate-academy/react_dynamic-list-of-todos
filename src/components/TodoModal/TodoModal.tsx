import React from 'react';
import { Loader } from '../Loader';
import { useUser } from './useUser';
import { Todo } from '../../types/Todo';

type TodoModalProps = {
  selectedTodo: Todo;
  handleClose: () => void;
};

export const TodoModal: React.FC<TodoModalProps> = ({
  selectedTodo,
  handleClose,
}) => {
  const { user, isLoading } = useUser(selectedTodo.userId);

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
              Todo #
              {selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
              {
                selectedTodo.completed
                && <strong className="has-text-success">Done</strong>
              }
              {
                !selectedTodo.completed
                && <strong className="has-text-danger">Planned</strong>
              }

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
