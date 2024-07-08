import React, { useContext } from 'react';
import { Loader } from '../Loader';
import { DispatchContext, StatesContext } from '../Context/GlobalStateProvider';

export const TodoModal: React.FC = () => {
  const states = useContext(StatesContext);
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StatesContext);

  const selectedTodo = todos.filter(todo => todo.id === states.selectedTodo);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {states.isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo &#35;{selectedTodo[0].id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch({ type: 'closeModal' });
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo[0].title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo[0].completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${selectedTodo[0].user}`}>Leanne Graham</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
