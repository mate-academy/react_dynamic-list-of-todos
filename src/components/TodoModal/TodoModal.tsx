import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { TodosContext } from '../../variables/TodosContext.1';
import { TODO_FOR_START } from '../../variables/TODO_FOR_START';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const { setIsModal, modaledTodo, setModaledTodo } = useContext(TodosContext);
  const {
    id,
    title,
    completed,
    userId,
  } = modaledTodo;

  const [userForModal, setUserForModal] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId).then(
      user => setUserForModal(user),
    );
  });

  const handleOnClickDelete = () => {
    setIsModal(false);
    setModaledTodo(TODO_FOR_START);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!userForModal ? (
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
              onClick={handleOnClickDelete}
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

              <a href={`mailto:${userForModal.email}`}>
                {userForModal.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
