import React from 'react';
import { Loader } from '../Loader';

import { User } from '../../types/User'; // Importar o tipo User
import { Todo } from '../../types/Todo'; // Importar o tipo Todo se for usar o título do todo

interface Props {
  isOpen: boolean;
  user: User | null;
  todo?: Todo | null; // Opcional: se quiser mostrar o título do todo no modal
  onClose: () => void;
  loadingUser: boolean;
  userError: string | null;
}

export const TodoModal: React.FC<Props> = ({
  isOpen,
  user,
  todo, // Opcional
  onClose,
  loadingUser,
  userError,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {loadingUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {userError ? 'Error' : todo ? `Todo #${todo.id}` : 'User Details'}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            {userError && (
              <p className="has-text-danger" data-cy="modal-error">
                {userError}
              </p>
            )}

            {!userError && todo && user && (
              <>
                <p className="block" data-cy="modal-title">
                  {todo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  <strong
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {todo.completed ? 'Done' : 'Planned'}
                  </strong>
                  {' by '}
                  <a href={`mailto:${user.email}`}>{user.name}</a>
                </p>
              </>
            )}

            {!userError && !user && !loadingUser && (
              <p>User details not available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
