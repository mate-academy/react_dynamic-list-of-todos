import React from 'react';
import { Loader } from '../Loader';

type TodoModalProps = {
  userName: string | undefined;
  todoId: number | null;
  todoTitle: string | null;
  onClose: () => void;
};

export const TodoModal: React.FC<TodoModalProps> = ({
  userName,
  todoId,
  todoTitle,
  onClose,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {userName === undefined ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todoId}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onClose()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoTitle}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">Planned</strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">{userName}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
