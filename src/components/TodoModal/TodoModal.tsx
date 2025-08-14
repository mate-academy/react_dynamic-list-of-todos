import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { InfoForModal } from '../../App';
import * as api from '../../api';
import { User } from '../../types/User';

interface Props {
  setIsDetailsShown: React.Dispatch<React.SetStateAction<boolean>>;
  setInfoForModal: React.Dispatch<React.SetStateAction<InfoForModal>>;
  infoForModal: InfoForModal;
}

export const TodoModal: React.FC<Props> = ({
  setIsDetailsShown,
  setInfoForModal,
  infoForModal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);

    if (!infoForModal) {
      return;
    }

    api
      .getUser(infoForModal.userId)
      .then(data => {
        setUser(data);
      })
      .finally(() => setIsLoading(false));
  }, [infoForModal]);

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
              Todo #{infoForModal && infoForModal.todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => {
                setIsDetailsShown(false);
                setInfoForModal(null);
              }}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {infoForModal && infoForModal.todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={`has-text-${
                  infoForModal && infoForModal.todo.completed
                    ? 'success'
                    : 'danger'
                }`}
              >
                {infoForModal && infoForModal.todo.completed
                  ? 'Done'
                  : 'Planned'}
              </strong>

              {' by '}

              {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
