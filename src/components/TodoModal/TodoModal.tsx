import React from 'react';
import { Loader } from '../Loader';
import { TodoInfo } from '../../types/TodoInfo';

type TodoModalProps = {
  todoInfo: TodoInfo | null;
  isLoadingTodoModal: boolean;
  onCloseTodo: () => void;
};

export const TodoModal: React.FC<TodoModalProps> = ({
  todoInfo,
  isLoadingTodoModal,
  onCloseTodo,
}: TodoModalProps) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadingTodoModal ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todoInfo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onCloseTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoInfo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={
                  todoInfo?.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todoInfo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${todoInfo?.user.email}`}>
                {todoInfo?.user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
