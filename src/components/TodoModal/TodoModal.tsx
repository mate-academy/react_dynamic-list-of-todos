import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { TodosContext, defaultTodo } from '../../context/TodosContext';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const { selectedTodo, setShow, setSelectedTodo } = useContext(TodosContext);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const {
    id,
    userId,
    title,
    completed,
  } = selectedTodo;

  useEffect(() => {
    getUser(userId).then(user => setSelectedUser(user));
  }, [userId]);

  const handlerClick = () => {
    setShow(false);
    setSelectedTodo(defaultTodo);
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
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handlerClick}
              type="button"
              className="delete"
              data-cy="modal-close"
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

              <a href={`mailto:${selectedUser.email}`}>
                {selectedUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
