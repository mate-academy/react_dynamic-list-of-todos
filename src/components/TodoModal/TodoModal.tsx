import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  userId: number,
  setVisibility: (value: boolean) => void,
  title: string,
  todoId: number,
};

export const TodoModal: React.FC<Props> = ({
  userId,
  setVisibility,
  title,
  todoId,
}) => {
  const [user, setUser] = useState<User>();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getUser(userId).then(res => {
      setUser(res);
      setLoader(false);
    });
  });

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loader ? <Loader /> : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setVisibility(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">Planned</strong>

              {' by '}

              <a href={user?.email}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
