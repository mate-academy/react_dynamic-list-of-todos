import React, { useEffect, useState } from 'react';
// import { Loader } from '../Loader';
import { Todo, TodoWithUser } from '../../types/Todo';
import { getUser } from '../../api';
import { Loader } from '../Loader';

interface PropsTodoModal {
  todoModal: Todo;
  handleResetTodoModal(reset: null): void;
}

export const TodoModal: React.FC<PropsTodoModal> = ({
  todoModal,
  handleResetTodoModal,
}) => {
  const [todoWithUser, setTodoWithUser] = useState<TodoWithUser | null>(null);

  const handleClose = () => {
    setTodoWithUser(null);
    handleResetTodoModal(null);
  };

  useEffect(() => {
    const { id, title, completed } = todoModal;

    const loadUser = async () => {
      const userData = await getUser(todoModal.userId);

      setTodoWithUser({
        id, title, completed, user: userData,
      });
    };

    loadUser();
  }, []);

  const {
    id, title, completed,
  } = todoWithUser || todoModal;

  const user = todoWithUser?.user;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {todoWithUser === null ? (<Loader />)
        : (
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
                onClick={handleClose}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                {completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}

                <a href={user ? user.email : ''}>
                  {user && user.name}
                </a>
              </p>
            </div>
          </div>
        )}

    </div>
  );
};
