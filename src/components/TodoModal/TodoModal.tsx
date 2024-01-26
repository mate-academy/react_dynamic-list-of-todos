import React, { useContext, useEffect } from 'react';
import { Loader } from '../Loader';
import {
  DispatchContext,
  StateContext,
} from '../../management/TodoContextProvider';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const { currentTodo, currentUser } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    getUser(currentTodo.userId).then(userFromServer => {
      dispatch({ type: 'getUser', payload: userFromServer });
    });
  }, [currentTodo, dispatch]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!currentUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch({ type: 'closedModal' });
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={currentUser?.email}>
                {currentUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
