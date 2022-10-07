import React from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

interface Props {
  todoLoading: boolean
  selectedTodo: Todo | null
  closeSelectedTodo: () => void
}

export const TodoModal: React.FC<Props> = ({
  todoLoading,
  selectedTodo,
  closeSelectedTodo,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {todoLoading ? (
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
              onClick={closeSelectedTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className="has-text-danger">Planned</strong>

              {' by '}

              <a href={selectedTodo?.user?.email}>
                {selectedTodo?.user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
