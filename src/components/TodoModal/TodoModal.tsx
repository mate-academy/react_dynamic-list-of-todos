import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { StateContext, ACTIONS, DispatchContext } from '../ToDoContext';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

export const TodoModal: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { selectedTodo } = useContext(StateContext);
  const [userState, setUserState] = useState({} as User);
  const [doWeNeedLoader, setDoWeNeedLaoder] = useState(false);

  function closeTodoModal() {
    dispatch({ type: ACTIONS.SET_TODO, payload: {} as Todo });
  }

  useEffect(() => {
    setDoWeNeedLaoder(true);
    getUser(selectedTodo.id)
      .then((res) => setUserState(res))
      /* eslint-disable */
      .catch((err) => console.log(err))
      /* eslint-enable */
      .finally(() => setDoWeNeedLaoder(false));

    return () => {
      setUserState({} as User);
    };
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {doWeNeedLoader ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {selectedTodo.id}
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
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {userState.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
