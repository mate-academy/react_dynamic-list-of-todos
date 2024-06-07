import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { useTodoModal } from './useTodoModal';

type TodoModalProps = {
  todo: Todo;
  handleHideModal: () => void;
};

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  handleHideModal,
}) => {
  const { user, isLoading, error } = useTodoModal(todo.userId);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleHideModal} />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Error
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleHideModal}
            />
          </header>
          <div className="modal-card-body">
            <p className="block" data-cy="modal-error">
              {error}
            </p>
          </div>
        </div>
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleHideModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
