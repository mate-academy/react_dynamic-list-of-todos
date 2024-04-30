import React, { useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  userTodo?: Todo | null;
  setModalIcon: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoModal: React.FC<Props> = ({ userTodo, setModalIcon }) => {
  const [loadingModalIcon, setLoadingModalIcon] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  if (userTodo) {
    getUser(userTodo.userId)
      .then(setUser)
      .finally(() => setLoadingModalIcon(false));
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingModalIcon ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${userTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setModalIcon(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {userTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {userTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}

              <a href="mailto:Sincere@april.biz">{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
