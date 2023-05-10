import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type TodoModalProps = {
  todo: Todo | null;
  todoId: number | null;
  setModalTodoId: (todoId: number | null) => void;
};

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  todoId,
  setModalTodoId,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (todo) {
      getUser(todo.userId)
        .then((data) => {
          setUser(data);
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    }
  }, []);

  const handleCloseModal = () => {
    setModalTodoId(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {!user ? (
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
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={classNames('has-text-success', {
                'has-text-danger': !todo?.completed,
              })}
              >
                {todo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={user.email}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
