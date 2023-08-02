import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  clickedUser: Todo
  setClickedUser: React.Dispatch<React.SetStateAction<Todo | null>>
};

export const TodoModal: React.FC<Props> = ({
  clickedUser,
  setClickedUser,
}) => {
  const [user, setUser] = useState<User>();
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    getUser(clickedUser.userId)
      .then(setUser)
      .catch(() => new Error('Try again later'))
      .finally(() => setIsUserLoading(false));
  }, [clickedUser]);

  const handleCloseClick = () => {
    setClickedUser(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {(isUserLoading && clickedUser) ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${clickedUser.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {clickedUser.title}
            </p>

            <p className="block" data-cy="modal-user">
              {clickedUser.completed
                ? (<strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
