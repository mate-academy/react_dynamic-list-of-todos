import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getData } from '../../utils/httpClient';

type Props = {
  user: User | null;
}

function getUser(user: User): Promise<User> {
  return getData(`/users/${user.id}.json`);
}

export const TodoModal: React.FC<Props> = ({ user }) => {
  const [loadingModal, setLoadingModal] = useState(false);
  const [userSt, setUserSt] = useState<User | null>(null);
  useEffect(() => {
    setLoadingModal(true);
    if (user !== null) {
      getUser(user).then(setUserSt).finally(() => setLoadingModal(false));
    }
  }, []);
  
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
              {`Todo #${userSt?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button type="button" className="delete" data-cy="modal-close" />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              quis ut nam facilis et officia qui
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">Planned</strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">{userSt?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
