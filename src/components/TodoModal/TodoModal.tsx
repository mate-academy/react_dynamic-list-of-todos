import React from 'react';
import { Loader } from '../Loader';
import { ExtendedTodo } from '../../types/ExtendedTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: ExtendedTodo | null;
  onClose: (value: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!todo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onClose(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed === false ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}

              {' by '}

              <a href={`mailto:${todo?.user.email}`}>{todo?.user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
