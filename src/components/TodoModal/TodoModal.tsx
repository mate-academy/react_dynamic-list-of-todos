import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { StateContext } from '../../context/stateContext';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const { state, dispatch } = useContext(StateContext);
  const [userTodo, setUserTodo] = useState<User>();
  const [isLoad, setIsLoad] = useState<boolean>(true);

  useEffect(() => {
    if (!state.inLoadModal.todo?.userId) {
      return;
    }

    setIsLoad(true);

    getUser(state.inLoadModal.todo.userId)
      .then(user => {
        setIsLoad(false);
        setUserTodo(user);
      })
      .catch(() => {
        dispatch({ type: 'modal', payload: { opened: false, todo: null } });
      });
  }, [state.inLoadModal.todo?.userId]);

  // console.log(userTodo);

  return (
    state.inLoadModal.opened && (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {isLoad ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{state.inLoadModal.todo?.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => {
                  setIsLoad(true);
                  dispatch({
                    type: 'modal',
                    payload: { opened: false, todo: null },
                  });
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {state.inLoadModal.todo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {state.inLoadModal.todo?.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                <a href="mailto:Sincere@april.biz">{userTodo?.name}</a>
              </p>
            </div>
          </div>
        )}
      </div>
    )
  );
};
