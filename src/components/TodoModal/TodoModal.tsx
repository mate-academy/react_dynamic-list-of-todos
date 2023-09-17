import React, { useContext, useEffect, useState } from 'react';

import { getUser } from '../../api';

import { TodoContext } from '../../context/ContextTodo';

import { User } from '../../types/User';

import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const {
    setIsOpenModal,
    selectedTodo,
    setSelectedTodo,
  } = useContext(TodoContext);

  useEffect(() => {
    getUser(selectedTodo?.userId ?? 0)
      .then(user => setSelectedUser(user));
  }, []);

  const handCloseModal = () => {
    setSelectedTodo(null);
    setIsOpenModal(false);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="delete button"
              onClick={handCloseModal}
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

              <a href={selectedUser.email}>
                {selectedUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
