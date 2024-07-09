import React, { useContext, useEffect } from 'react';
import { Loader } from '../Loader';
import { DispatchContext, StatesContext } from '../Context/GlobalStateProvider';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const { selectedTodoId, todos, isLoading, selectedTodoUser } =
    useContext(StatesContext);
  const dispatch = useContext(DispatchContext);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  useEffect(() => {
    dispatch({ type: 'startLoading' });
    if (selectedTodo) {
      getUser(selectedTodo?.userId)
        .then(userSelected =>
          dispatch({ type: 'pickTodoUser', payload: userSelected }),
        )
        .finally(() => dispatch({ type: 'stopLoading' }));
    }
  }, [dispatch, selectedTodo]);

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

              <a href={selectedTodoUser?.email}>{selectedTodoUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
