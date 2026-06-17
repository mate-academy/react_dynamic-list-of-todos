import React from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  currentUser: User | null;
  modalLoading: boolean;
  currentTodo: Todo | null;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  currentUser,
  modalLoading,
  currentTodo,
  onClose,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {modalLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {currentTodo ? `Todo #${currentTodo.id}` : 'Todo'}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                onClose();
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title || 'quis ut nam facilis et officia qui'}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-success': currentTodo?.completed,
                  'has-text-danger': !currentTodo?.completed,
                })}
              >
                {currentTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={currentUser ? `mailto:${currentUser.email}` : undefined}>
                {currentUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
