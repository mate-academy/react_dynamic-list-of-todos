import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';
import { TodoModalType } from '../../types/TodoModal';
import { Loader } from '../Loader';

interface TodoModalProps {
  todoModal: TodoModalType;
  setIsClicked: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  todoModal,
  setIsClicked,
  isLoading,
}) => {
  const { todo, user } = todoModal;
  const todoStatus = todo.completed ? 'Done' : 'Planned';

  const handleModalClosure = () => {
    setIsClicked(false);
  };

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
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handleModalClosure}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              quis ut nam facilis et officia qui
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={classNames({
                'has-text-danger': !todo.completed,
                'has-text-success': todo.completed,
              })}
              >
                {todoStatus}

              </strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
