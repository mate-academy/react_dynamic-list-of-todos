import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface Props {
  changeOpen: (value: boolean) => void;
  currentTodo: Todo;
}

export const TodoModal: React.FC<Props> = ({
  changeOpen,
  currentTodo: { id, title, completed, userId },
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingInModal, setLoadingInModal] = useState(true);

  useEffect(() => {
    setLoadingInModal(true);
    getUser(userId)
      .then(setUser)
      .finally(() => setLoadingInModal(false));
  }, [userId]);

  // console.log(currentTodo);
  // console.log(user);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingInModal ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => changeOpen(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={cn({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
                })}
              >
                {completed ? 'Done' : 'Planned'}
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
