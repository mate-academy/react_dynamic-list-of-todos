import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface TodoModalProps {
  chosenTodo: Todo,
  nonExistedTodo: Todo,
  setChosenTodo: (todo: Todo) => void,
}

export const TodoModal: React.FC<TodoModalProps> = ({
  chosenTodo,
  nonExistedTodo,
  setChosenTodo,
}) => {
  const [user, setUser] = useState<User>();
  const [isShowTodoModal, setIsShowTodoModal] = useState(true);

  const handleDeleteTodoModal = () => {
    setChosenTodo(nonExistedTodo);
  };

  useEffect(() => {
    getUser(chosenTodo.userId)
      .then(setUser)
      .then(() => setShowTodoModal(false));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {showTodoModal ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${chosenTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleDeleteTodoModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {chosenTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {chosenTodo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
