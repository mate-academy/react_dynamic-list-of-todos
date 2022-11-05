import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { UserContext } from '../UserContext';
import { Todo } from '../../types/Todo';

export const TodoModal: React.FC = () => {
  const {
    todos,
    selectedTodoId,
    userInfo,
    getUserFromServer,
    handleClose,
  } = useContext(UserContext);

  useEffect(() => {
    getUserFromServer();
  }, []);

  const currentTodo: Todo | undefined = todos
    .find(todo => todo.id === selectedTodoId);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!userInfo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodoId}`}
            </div>

            <button
              aria-label="close"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={classNames(
                {
                  'has-text-danger': !currentTodo?.completed,
                  'has-text-success': currentTodo?.completed,
                },
              )}
              >
                {currentTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${userInfo.email}`}>
                {userInfo.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
