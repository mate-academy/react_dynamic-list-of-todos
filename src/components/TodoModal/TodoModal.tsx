import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  selectedUser: User | null;
  selectedTodo: Todo | null;
  closeModal: () => void;
}

export const TodoModal: React.FC<Props> = ({
  selectedUser,
  selectedTodo,
  closeModal,
}) => (
  <div className="modal is-active" data-cy="modal">
    <div className="modal-background" />

    {!selectedUser || !selectedTodo ? (
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
            onClick={() => closeModal()}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {selectedTodo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {/* <strong className="has-text-success">Done</strong> */}
            <strong className="has-text-danger">
              {selectedTodo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}
            </strong>

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
