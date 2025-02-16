import React from 'react';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface TOdoModalProps {
  modalIsActive: boolean;
  userInfo: boolean;
  userLoading: boolean;
  handleHideUser: () => void;
  selectedUser: User | null;
  selectedTodo: Todo | null;
  todos: Todo[];
}

export const TodoModal: React.FC<TOdoModalProps> = ({
  modalIsActive,
  userInfo,
  userLoading,
  handleHideUser,
  selectedUser,
  selectedTodo,
}) => {
  return (
    <div
      className={classNames('modal', { 'is-active': modalIsActive })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {userLoading && <Loader />}
      {userInfo && (
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
              onClick={handleHideUser}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={
                  selectedTodo?.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {selectedTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${selectedUser?.email}`}>{selectedUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
