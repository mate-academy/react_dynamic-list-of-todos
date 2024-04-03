import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useTodos } from '../../store/Store';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const { selectedTodo, user, setUser, setSelectedTodo } = useTodos();
  const [isModalShow, setIsModalShow] = useState(true);
  const [modal, setModal] = useState(true);

  const { id, title, completed } = selectedTodo || {};

  const handleCloseModal = () => {
    setModal(false);
    setSelectedTodo(null);
  };

  useEffect(() => {
    if (selectedTodo) {
      setIsModalShow(true);
      getUser(selectedTodo.userId)
        .then(setUser)
        .finally(() => setIsModalShow(false));
    }
  }, [selectedTodo, setUser]);

  if (!modal) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isModalShow ? (
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
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
