import React, { useContext } from 'react';
// import { Loader } from '../Loader';
import classNames from 'classnames';
import { TodoContext } from '../TodoContext';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

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

  const { id, title, completed } = selectedTodo as Todo;

  const handleResetModal = () => {
    setShowModal(!showModal);
    setUser(null);
    setSelectedTodo(null);
  };

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
                {`Todo #${id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={handleResetModal}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={classNames({
                    'has-text-danger': !completed,
                    'has-text-success': completed,
                  })}
                >
                  {completed ? 'Done' : 'Planned'}
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
