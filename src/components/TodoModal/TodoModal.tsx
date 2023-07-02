import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface TodoModalProps {
  selectedTodo: Todo,
  nonExistedTodo: Todo,
  setSelectedTodo: (todo: Todo) => void,
}

export const TodoModal: React.FC<TodoModalProps> = ({
  selectedTodo,
  nonExistedTodo,
  setSelectedTodo,
}) => {
  const [user, setUser] = useState<User>();
  const [isShowTodoModal, setIsShowTodoModal] = useState(true);

  const handleDeleteTodoModal = () => {
    setSelectedTodo(nonExistedTodo);
  };

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then(setUser)
      .then(() => setIsShowTodoModal(false));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isShowTodoModal ? (
        <Loader />
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
              onClick={handleDeleteTodoModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed
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
