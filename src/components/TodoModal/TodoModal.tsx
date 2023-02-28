import cn from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo,
  isLoadingUser: boolean,
  selectedUser: User | null,
  onClosePopUp: () => void,
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  isLoadingUser,
  selectedUser,
  onClosePopUp,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadingUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClosePopUp}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={cn(
                {
                  'has-text-success': selectedTodo.completed,
                  'has-text-danger': !selectedTodo.completed,
                },
              )}
              >
                {selectedTodo.completed
                  ? 'Done'
                  : 'Planned'}
              </strong>
              <strong className="has-text-danger">
                {selectedTodo.completed}
              </strong>

              {' by '}

              <a href={`mailto:${selectedUser?.email}`}>
                {selectedUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
