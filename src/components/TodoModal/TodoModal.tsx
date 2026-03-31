import React, { useContext } from 'react';
import { Loader } from '../Loader';
import { todoContext } from '../../contexts/TodoContext';

export const TodoModal: React.FC = () => {
  const { handleCloseUserModal, user, isUserLoading, userTodo, userError } =
    useContext(todoContext);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {userTodo ? `Todo #${userTodo.id}` : 'Todo details'}
          </div>
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={handleCloseUserModal}
          />
        </header>
        <div className="modal-card-body">
          {isUserLoading ? (
            <Loader />
          ) : userError ? (
            <p className="has-text-danger">Failed to load user details.</p>
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                {userTodo?.title}
              </p>
              <p className="block" data-cy="modal-user">
                {userTodo?.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}
                {' by '}
                {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
