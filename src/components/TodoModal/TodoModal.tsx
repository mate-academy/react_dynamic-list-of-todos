import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import classNames from 'classnames';

type Props = {
  selectedTodo: Todo | null;
  selectedUser: User | null;
  onCloseTodo: () => void;
  userLoading: boolean;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  selectedUser,
  onCloseTodo,
  userLoading,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background"
        onClick={onCloseTodo}
      />

      {userLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo?.id}
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
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                  className={classNames({
                    'has-text-success': selectedTodo?.completed,
                    'has-text-danger': !selectedTodo?.completed,
                  })}
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
