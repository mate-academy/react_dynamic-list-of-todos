import React, { useContext } from 'react';
import { ModalLoader } from '../Loader';
import { TodoContext } from '../../TodoContext';

const TodoModal: React.FC = () => {
  const {
    isModalLoading,
    user,
    selectedTodo,
    closeModalWindow,
  } = useContext(TodoContext);

  const todoStatus = selectedTodo.completed
    ? 'Done'
    : 'Planned';

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isModalLoading ? (
        <ModalLoader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModalWindow}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">{todoStatus}</strong>

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export const VisibleTodoModal = () => {
  const { isVisible } = useContext(TodoContext);

  return (
    <>
      {isVisible && <TodoModal />}
    </>
  );
};
