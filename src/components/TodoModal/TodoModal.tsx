import React, { useState, useEffect } from 'react';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  userId: number,
  handleClose: () => void,
  todo: Todo,
};

export const TodoModal: React.FC<Props> = ({ userId, handleClose, todo }) => {
  const [activeUser, setActiveUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUser(userId).then(response => {
      setActiveUser(response);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

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
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">Planned</strong>

              {' by '}

              {activeUser
                && (
                  <a href={`mailto:${activeUser.email}`}>
                    {activeUser.name}
                  </a>
                )}

            </p>
          </div>
        </div>
      )}

    </div>
  );
};
