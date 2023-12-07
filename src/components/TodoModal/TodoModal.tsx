import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import { getUser } from '../../api';

interface TodoModalProps {
  todo: Todo,
  handleCloseTodo: (value: Todo | null) => void
}

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  handleCloseTodo,
}) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  const {
    title, id, userId, completed,
  } = todo;

  useEffect(() => {
    setIsLoading(true);
    getUser(userId)
      .then((setUser))
      .catch((error) => error.message)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={`modal ${todo && 'is-active'}`} data-cy="modal">
      <div className="modal-background" />

      {isLoading
        ? (
          <Loader />)
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
                onClick={
                  () => handleCloseTodo(null)
                }
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong className={completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
                >
                  {completed ? 'Done' : 'Planned'}
                </strong>
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
