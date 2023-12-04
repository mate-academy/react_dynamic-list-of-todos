import React, { useContext } from 'react';
import { Loader } from '../Loader';
import { TodoContext } from '../../context';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const {
    todo,
    setTodo,
    user,
    setUser,
    showModal,
    setShowModal,
    loading,
  } = useContext(TodoContext);

  const handleModalCloseClick = () => {
    setShowModal(false);
    setTodo({} as Todo);
    setUser({} as User);
  };

  const {
    id,
    title,
    completed,
  } = todo;

  const { name, email } = user;

  return (
    <>
      {showModal && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />

          {loading ? (
            <Loader />
          ) : (
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
                  onClick={handleModalCloseClick}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {title}
                </p>

                <p className="block" data-cy="modal-user">
                  {
                    completed
                      ? <strong className="has-text-success">Done</strong>
                      : <strong className="has-text-danger">Planned</strong>
                  }

                  {' by '}

                  <a href={`mailto:${email}`}>
                    {name}
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
