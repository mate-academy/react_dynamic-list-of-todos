import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  userData: User | null;
  currentTodo: Todo | null;
  loadModal: (isLoading: boolean) => void;
  loadUserDataError: boolean;
};

export const TodoModal: React.FC<Props> = React.memo(({
  userData,
  currentTodo,
  loadModal,
  loadUserDataError,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!(currentTodo) ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => loadModal(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            {!loadUserDataError ? (
              <p className="block" data-cy="modal-user">
                {currentTodo.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}

                <a href={`mailto:${userData?.email}`}>
                  {userData?.name}
                </a>
              </p>
            )
              : <div className="has-text-danger">Owner todo not found</div>}
          </div>
        </div>
      )}
    </div>
  );
});
