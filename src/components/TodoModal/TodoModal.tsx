import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type TodoModalProps = {
  onClick?: (id: number) => void;
  todo?: Todo;
};

export const TodoModal: React.FC<TodoModalProps> = ({ todo, onClick }) => {
  const [userTodo, setUserTodo] = useState<User | undefined>();
  const [userLoading, setUserLoading] = useState<boolean>(false);

  useEffect(() => {
    if (todo && todo.userId) {
      setUserLoading(true);
      getUser(todo.userId)
        .then(user => {
          setUserTodo(user);
        })
        .finally(() => {
          setUserLoading(false);
        });
    }
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {userLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onClick && onClick(todo?.id || 0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a
                href={`mailto:${userTodo?.email}`}
                className="has-text-weight-medium"
              >
                {userTodo?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
