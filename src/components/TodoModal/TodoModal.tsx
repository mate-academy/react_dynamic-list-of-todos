import React, { memo, useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo | null,
  onClose: () => void,
};

export const TodoModal: React.FC<Props> = memo(({ todo, onClose }) => {
  const [ownerOfTodo, setownerOfTodo] = useState<User | null>(null);

  useEffect(() => {
    if (todo) {
      getUser(todo.userId)
        .then(user => setownerOfTodo(user));
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!ownerOfTodo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {
                todo?.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>
              }

              {' by '}

              <a href={`mailto:${ownerOfTodo.email}`}>
                {ownerOfTodo.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
