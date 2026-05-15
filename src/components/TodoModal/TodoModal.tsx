import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type PropsTodoModal = {
  todo: Todo;
  handleCloseTodoModal: () => void;
};

export const TodoModal: React.FC<PropsTodoModal> = ({
  todo,
  handleCloseTodoModal,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [todoLoader, setTodoLoader] = useState(false);

  useEffect(() => {
    setTodoLoader(true);
    getUser(todo.userId)
      .then(setCurrentUser)
      .finally(() => setTodoLoader(false));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {todoLoader ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseTodoModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${currentUser?.email}`}>{currentUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
