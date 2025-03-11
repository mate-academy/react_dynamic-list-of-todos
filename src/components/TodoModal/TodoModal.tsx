import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api/api';
import { Todo } from '../../types/Todo';

type ModalProps = {
  userId: number;
  userTodo: Todo;
  updateModal: () => void;
};

export const TodoModal: React.FC<ModalProps> = ({
  userId,
  userTodo,
  updateModal,
}) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(!user);

  const { id, title, completed } = userTodo;

  useEffect(() => {
    if (!user) {
      getUser(userId)
        .then(userDB => setUser(userDB))
        .finally(() => setIsLoading(false));
    }
  }, [userId]);

  const authorMessage = completed ? 'Done' : 'Planned';
  const authorMessageColorClass = completed
    ? 'has-text-success'
    : 'has-text-danger';

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
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
              onClick={() => updateModal()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={authorMessageColorClass}>
                {authorMessage}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
