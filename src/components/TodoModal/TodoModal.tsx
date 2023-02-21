import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  userData: User | null;
  currentTodoData: Todo | null;
  loadModal: (isLoading: boolean) => void;
};

export const TodoModal: React.FC<Props> = React.memo(({
  userData,
  currentTodoData,
  loadModal,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!currentTodoData ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodoData.id}`}
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
              {currentTodoData.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodoData.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}
              {' by '}
              {userData ? (
                <a href={`mailto:${userData.email}`}>
                  {userData.name}
                </a>
              )
                : (
                  <span>
                    unknown
                  </span>
                )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
