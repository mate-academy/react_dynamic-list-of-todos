import React, { useState, useEffect } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader/Loader';

type Props = {
  todos: Todo[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSelect: React.Dispatch<React.SetStateAction<number>>;
  isSelect: number;
};

export const TodoModal: React.FC<Props> = ({
  todos,
  setOpen,
  setIsSelect,
  isSelect,
}) => {
  const select = todos.find((todo) => todo.id === isSelect);
  const [user, setUser] = useState<User>();
  const [isUserInfoLoaded, setIsUserInfoLoaded] = useState(false);

  useEffect(() => {
    getUser(select?.userId || 0)
      .then((userFromServer) => {
        setUser(userFromServer);
        setIsUserInfoLoaded(true);
      })
      .catch((error) => {
        // eslint-disable-next-line no-alert
        alert(error.message);
      });
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isUserInfoLoaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${isSelect}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setOpen(false);
                setIsSelect(-1);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {select?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={
                  select?.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {select?.completed === true ? 'Done' : 'Planned'}
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
