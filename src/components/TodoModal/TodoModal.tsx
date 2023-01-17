import React, { memo, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  todo: Todo,
  onCloseModal: () => void,
}

export const TodoModal: React.FC<Props> = memo(({
  todo,
  onCloseModal,
}) => {
  const [userOfTodo, setUserOfTodo] = useState<User | null>(null);

  useEffect(() => {
    getUser(todo.userId)
      .then(user => setUserOfTodo(user));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!userOfTodo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {todo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${userOfTodo?.email}`}>
                {userOfTodo?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
