import React, { useContext, useEffect } from 'react';
import { Loader } from '../Loader';
import { DispatchContext, StatesContext } from '../Context/GlobalStateProvider';

export const TodoModal: React.FC = () => {
  const { selectedTodoId, todos, users, isLoading } = useContext(StatesContext);
  const dispatch = useContext(DispatchContext);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);
  const currentUser = users.find(user => user.id === selectedTodo?.userId);

  useEffect(() => {
    dispatch({ type: 'startLoading' });
    dispatch({ type: 'stopLoading' });
  }, [dispatch]);

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
              Todo &#35;{selectedTodoId}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch({ type: 'closeModal' });
                dispatch({ type: 'pickTodoId', payload: null });
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={currentUser?.email}>{currentUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
