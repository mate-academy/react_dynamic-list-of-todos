import React, { useContext, useEffect, useState } from 'react';
import { getUser } from '../../api';
import {
  ActionTypes,
  DispatchContext,
  StateContext,
} from '../../context/TodoContext';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useContext(DispatchContext);
  const { currentTodo } = useContext(StateContext);

  const onCloseModal = () => {
    dispatch({
      type: ActionTypes.OPEN_MODAL,
      payload: false,
    });
    dispatch({
      type: ActionTypes.CURRENT_TODO,
      payload: null,
    });
  };

  useEffect(() => {
    setIsLoading(true);
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(setUser)
        .finally(() => setIsLoading(false));
    }
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
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
              onClick={onCloseModal}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>
          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>
            <p className="block" data-cy="modal-user">
              <strong
                className={
                  currentTodo?.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {currentTodo?.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
