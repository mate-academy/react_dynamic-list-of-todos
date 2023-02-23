import React, { useContext } from 'react';
import { GlobalContext } from '../../reducer';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const [state, dispatch] = useContext(GlobalContext);

  const resetAll = () => {
    dispatch({ type: 'CheckedUser', userId: null });
    dispatch({ type: 'InfoUser', user: null });
    dispatch({ type: 'CheckedTodo', todo: null });
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {state.user ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${state.checkTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={resetAll}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {state.checkTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {state.checkTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {state.user.name}
              </a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
