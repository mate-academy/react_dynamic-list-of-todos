import React from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface TodoModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  isLoading: boolean;
  selectedTodo: Todo | null;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  user,
  isLoading,
  selectedTodo,
  setSelectedTodo,
}) => {
  return (
    <>
      {isModalOpen && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />

          {isLoading ? (
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
                  onClick={() => {
                    setIsModalOpen(false);

                    setSelectedTodo(null);
                  }}
                />
              </header>
              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {selectedTodo?.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {selectedTodo?.completed ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}

                  {' by '}

                  <a href={`mailto:${user?.email}`}>{user?.name}</a>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
