import React, { useState, useEffect } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo,
  todoId: number,
  showTodoModal: React.Dispatch<React.SetStateAction<boolean>>,
  resetTodoId: React.Dispatch<React.SetStateAction<number>>,
};

export const TodoModal: React.FC<Props> = ({
  todo, todoId, showTodoModal, resetTodoId,
}) => {
  const [user, setUser] = useState<User>();

  async function loadUser() {
    const userFromServer = await getUser(todo.userId);

    setUser(userFromServer);
  }

  useEffect(() => {
    loadUser();
  }, []);

  function handleCloseTodoModal() {
    showTodoModal(false);
    resetTodoId(0);
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user === undefined ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todoId}`}
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
              { todo.title }
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={user?.email}>
                { user?.name }
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
