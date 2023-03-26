import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC<{
  initialTodo: Todo
  setCarierTodo: React.Dispatch<React.SetStateAction<Todo>>
  carierTodo: Todo
}> = ({
  initialTodo,
  setCarierTodo,
  carierTodo,
}) => {
  const [user, setUser] = useState<User>();

  const {
    title, userId, id, completed,
  } = carierTodo;

  useEffect(() => {
    try {
      getUser(userId)
        .then((userFromServer) => {
          setUser(userFromServer);
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [userId]);

  const resetTodoModal = () => {
    setCarierTodo(initialTodo);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {carierTodo.id === 0 ? (
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
              onClick={resetTodoModal}
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

              {user && (
                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
