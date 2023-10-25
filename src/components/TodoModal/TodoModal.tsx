import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface TodoModalProps {
  isUserLoading: boolean;
  user: User | null;
  selectedTodo: Todo | null;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  isUserLoading,
  user,
  selectedTodo,
  setSelectedTodo,
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
              {`Todo #${selectedTodo?.id || ''}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setSelectedTodo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title || ''}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={selectedTodo?.completed
                ? 'has-text-success'
                : 'has-text-danger'}
              >
                {selectedTodo?.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>

          </div>
        </div>
      )}
    </div>
  );
};
