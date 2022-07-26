import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo | null,
  selectedUser: User | null,
  onSelectTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  setModal: React.Dispatch<React.SetStateAction<boolean>>,
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  selectedUser,
  onSelectTodo,
  setSelectedUser,
  setModal,
}) => {
  return (
    <div
      className="modal is-active"
      data-cy="modal"
    >
      <div className="modal-background" />

      {!selectedUser ? (
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
            <h2>Title</h2>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                onSelectTodo(null);
                setSelectedUser(null);
                setModal(false);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>
            {selectedUser && (
              <p className="block" data-cy="modal-user">
                {selectedTodo?.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}

                <a href={`mailto:${selectedUser.email}`}>
                  {selectedUser.name}
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
