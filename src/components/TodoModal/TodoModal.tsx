import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../TodoContext';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const {
    user,
    setUser,
    selectedTodo,
    showModal,
    setShowModal,
    setSelectedTodo,
  }
  = useContext(TodoContext);

  return (
    <>
      {user ? (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />
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
                  setShowModal(!showModal);
                  setUser(null);
                  setSelectedTodo(null);
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong
                  className={classNames({
                    'has-text-danger': !selectedTodo?.completed,
                    'has-text-success': selectedTodo?.completed,
                  })}
                >
                  {selectedTodo?.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />
          <Loader />
        </div>
      )}
    </>
  );
};
