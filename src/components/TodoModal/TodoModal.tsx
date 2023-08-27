// eslint-disable
import React, { useContext, useEffect, useState } from 'react';
// import { Loader } from '../Loader';
import { getUser } from '../../api';
import { StateContext, ACTIONS, DispatchContext } from '../ToDoContext';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

export const TodoModal: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { selectedTodo } = useContext(StateContext);
  const [userState, setUserState] = useState({} as User);

  function closeTodoModal() {
    dispatch({ type: ACTIONS.SET_TODO, payload: {} as Todo });
  }

  useEffect(() => {
    getUser(selectedTodo.id)
      .then((res) => setUserState(res));

    return () => {
      setUserState({} as User);
    };
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {/* {true ? (
        <Loader />
      ) : ( */}
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #2
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={closeTodoModal}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {selectedTodo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {/* <strong className="has-text-success">Done</strong> */}
            <strong className="has-text-danger">Planned</strong>

            {' by '}

            <a href="mailto:Sincere@april.biz">
              {userState.name}
            </a>
          </p>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};
