import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

interface Props {
  showUser: Todo,
  setShowUser: (todo: Todo | null) => void,
  setSelectedTodoId: (id: number) => void,
}

export const TodoModal: React.FC<Props>
= ({ showUser, setShowUser, setSelectedTodoId }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(showUser.userId).then((userToShow: User | null) => {
      if (userToShow) {
        setUser(userToShow);
      }
    });
  });

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${showUser.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setShowUser(null);
                setSelectedTodoId(0);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {showUser.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {showUser.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

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
