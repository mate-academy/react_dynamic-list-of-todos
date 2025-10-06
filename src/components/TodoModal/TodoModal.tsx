import React from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface Props {
  selectedTodo: Todo | null;
  user: User | null;
  isUserLoading: boolean;
  onClose: (id: number | null) => void;
}

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  user,
  isUserLoading,
  onClose,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoading ? (
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
              onClick={() => onClose(null)}
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
                  'has-text-danger': !selectedTodo?.completed,
                  'has-text-success': selectedTodo?.completed,
                })}
              >
                {selectedTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
