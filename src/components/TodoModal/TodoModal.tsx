import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getData } from '../../utils/httpClient';
import { Todo } from '../../types/Todo';

type Props = {
  user: User | null;
  checkedTodo: Todo | null;
  closeModal: (value: Todo | null) => void;
};

function getUser(user: User): Promise<User> {
  return getData(`/users/${user.id}.json`);
}

export const TodoModal: React.FC<Props> = ({ user, checkedTodo, closeModal }) => {
  const [loadingModal, setLoadingModal] = useState(false);
  const [userSt, setUserSt] = useState<User | null>(null);

  useEffect(() => {
    setLoadingModal(true);
    if (user !== null) {
      getUser(user)
        .then(setUserSt)
        .finally(() => setLoadingModal(false));
    }
  }, [user]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingModal ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${checkedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button 
              type="button" 
              className="delete" 
              data-cy="modal-close"
              onClick={() => closeModal(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {checkedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={cn({
                  'has-text-danger': checkedTodo?.completed === false,
                  'has-text-success': checkedTodo?.completed === true,
                })}>
                Planned
              </strong>

              {' by '}

              <a href={`mailto:${userSt?.email}`}>{userSt?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
