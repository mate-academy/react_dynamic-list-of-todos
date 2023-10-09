import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Propse = {
  userId: number | undefined,
  idTodo: number | undefined,
  titleTodo: string | undefined,
  completed: boolean | undefined,
  onRemoveModal: () => void
};

export const TodoModal: React.FC<Propse> = ({
  userId,
  idTodo,
  titleTodo,
  completed,
  onRemoveModal,
}) => {
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    if (userId) {
      getUser(userId).then(setCurrentUser);
    }
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!currentUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${idTodo}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onRemoveModal()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {titleTodo}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={`has-text-${completed ? 'success' : 'danger'}`}>
                {`${completed ? 'Done' : 'Planned'}`}
              </strong>

              {' by '}

              <a href={`mailto:${currentUser.email}`}>
                {currentUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
