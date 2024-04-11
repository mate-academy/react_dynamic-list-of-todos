import React, { useContext, useEffect } from 'react';
import { Loader } from '../Loader';
import { DispatchContext, StateContext } from '../../context/ReduxContext';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const { currentTitle, statusCompleted, user, userId, currentId } =
    useContext(StateContext);

  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    const abortController = new AbortController();

    getUser(userId).then(users => {
      return dispatch({ type: 'setUsers', payload: users });
    });

    return () => {
      abortController.abort();
    };
  }, [dispatch, userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentId}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => dispatch({ type: 'close' })}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTitle}
            </p>

            <p className="block" data-cy="modal-user">
              {statusCompleted ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
