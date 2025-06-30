import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
type Props = {
  setModalWindow: (value: boolean) => void;
  currentUser: User | null;
  loading: boolean;
  currentTodo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({
  setModalWindow,
  currentUser,
  currentTodo,
  loading,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo?.id}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setModalWindow(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              quis ut nam facilis et officia qui
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo ? (
                currentTodo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )
              ) : (
                <span>No todo selected</span>
              )}

              {' by '}
              <a href={`mailto:${currentUser?.email ?? ''}`}>
                {currentUser?.name ?? 'Unknown user'}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
