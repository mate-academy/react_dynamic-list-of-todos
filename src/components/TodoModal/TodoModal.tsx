import React, { useContext } from 'react';
import { Loader } from '../Loader';
import { TodoContext } from '../TodoContext/TodoContext';

export const TodoModal: React.FC = () => {
  const {
    selectedTodo,
    setSelectedTodo,
    selectedUser,
    loader,
  } = useContext(TodoContext);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loader
        ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${selectedTodo?.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => {
                  setSelectedTodo(null);
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {selectedTodo?.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}

                <a href={`mailto:${selectedUser?.email}`}>
                  {selectedUser?.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
