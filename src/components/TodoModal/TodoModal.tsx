/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo | null;
  isLoading: boolean;
  setSelectedTodoId: (todoId: number) => void;
}

export const TodoModal: React.FC<Props> = ({
  todo,
  isLoading,
  setSelectedTodoId,
}) => (
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
            {`Todo #${todo?.id}`}
          </div>

          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => setSelectedTodoId(0)}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {todo?.title}
          </p>

          <p className="block" data-cy="modal-user">
            {todo?.completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}

            {' by '}

            <a href={`mailto:${todo?.user?.email}`}>
              {todo?.user?.name}
            </a>
          </p>
        </div>
      </div>
    )}
  </div>
);
