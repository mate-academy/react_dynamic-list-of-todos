import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  selectedTodo: Todo | null
  currentUser: User | null
  onResetTodo: React.Dispatch<React.SetStateAction<Todo | null>>
  onResetUser: React.Dispatch<React.SetStateAction<User | null>>
  onResetModalVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  currentUser,
  onResetTodo,
  onResetUser,
  onResetModalVisibility,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {!currentUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            {selectedTodo && (
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${selectedTodo.id}`}
              </div>
            )}

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                onResetTodo(null);
                onResetUser(null);
                onResetModalVisibility(false);
              }}
            />
          </header>

          <div className="modal-card-body">
            {selectedTodo && (
              <p className="block" data-cy="modal-title">
                {selectedTodo.title}
              </p>
            )}

            {currentUser && (
              <p className="block" data-cy="modal-user">
                {selectedTodo?.completed && (
                  <strong className="has-text-success">Done</strong>
                )}
                {!selectedTodo?.completed && (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                <a href={`mailto:${currentUser.email}`}>
                  {currentUser.name}
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
