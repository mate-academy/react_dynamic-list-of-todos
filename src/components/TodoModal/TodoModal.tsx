import React, { memo, useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
  onTodo: (todo: Todo | null) => void
};

export const TodoModal: React.FC<Props> = memo(({
  todo,
  onTodo,
}) => {
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    getUser(todo.userId)
      .then(response => setUserDetails(response));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!userDetails ? (
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
              onClick={() => onTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={todo.completed
                ? 'has-text-success'
                : 'has-text-danger'}
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${userDetails.email}`}>
                {userDetails.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
