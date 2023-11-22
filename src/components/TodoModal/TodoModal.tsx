import React from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  modalLoading: boolean;
  selectedTodo: Todo | null;
  setSelectedTodo: (value: Todo | null) => void;
  selectedUser: User | null;
  setSelectedUser: (value: User | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  modalLoading,
  selectedTodo,
  setSelectedTodo,
  selectedUser,
  setSelectedUser,
}) => {
  const handleCloseModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
  };

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
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handleCloseModal}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={classNames({
                'has-text-success': selectedTodo?.completed,
                'has-text-danger': !selectedTodo?.completed,
              })}
              >
                {selectedTodo?.completed ? 'Done' : 'Planned'}
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
