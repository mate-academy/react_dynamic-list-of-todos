import React from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface Props {
  isLoadingUser: boolean;
  selectedUser: User | null;
  selectedTodo: Todo | null;
  closeModal: () => void;
}

export const TodoModal: React.FC<Props> = ({
  isLoadingUser,
  selectedUser,
  selectedTodo,
  closeModal,
}) => {
  // console.log(isLoadingUser);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadingUser ? (
        <Loader />
      ) : (selectedUser && selectedTodo) && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
              aria-label="Close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${selectedUser.email}`}>
                {selectedUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
