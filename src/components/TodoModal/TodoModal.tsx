import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Modal = {
  selectedUserTodo: Todo | null,
  onModalClose(): void,
};

export const TodoModal: React.FC<Modal> = ({
  onModalClose,
  selectedUserTodo,
}) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [userTodo, setUserTodo] = useState<Todo | null>(selectedUserTodo);

  useEffect(() => {
    if (userTodo) {
      getUser(userTodo.id)
      .then(response => setUserInfo(response));
    }
  }, [userTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!userInfo?.name ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo ${userTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                onModalClose();
                setUserTodo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {userTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {userTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`${userInfo.email}`}>
                {userInfo.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
