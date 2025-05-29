import React from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodo: Todo | null;
  user: User;
  isLoading: boolean;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  user,
  isLoading,
  onClose,
}) => {
  // Якщо не завантажується і немає вибраного туду — не показуємо модалку
  if (!isLoading && !selectedTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : selectedTodo ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  selectedTodo.completed
                    ? 'has-text-danger'
                    : 'has-text-success'
                }
              >
                {selectedTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              {user ? (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              ) : (
                'unknown user'
              )}
            </p>
          </div>
        </div>
      ) : (
        // Це запасний варіант, якщо selectedTodo з якоїсь причини все ж null, але isLoading false
        <div className="modal-card">
          <header className="modal-card-head">
            <div className="modal-card-title">No todo selected</div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="close"
              onClick={onClose}
            />
          </header>
          <div className="modal-card-body">Please select a todo.</div>
        </div>
      )}
    </div>
  );
};
