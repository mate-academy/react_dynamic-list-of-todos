import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  closeButton: (todo: Todo | null) => void;
  loading: boolean;
  modalState: Todo | null;
  setLoading: (loading: boolean) => void;
  setUserData: (user: User) => void;
  userData: User;
};

export const TodoModal: React.FC<Props> = ({
  closeButton,
  loading,
  modalState,
  setLoading,
  setUserData,
  userData,
}: Props) => {
  useEffect(() => {
    setLoading(true);
    getUser(modalState?.id)
      .then(user => setUserData(user))
      .finally(() => setLoading(false));
  }, [modalState?.id]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loading || !modalState ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{modalState?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => closeButton(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {modalState.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  modalState.completed ? 'has-text-danger' : 'has-text-success'
                }
              >
                {modalState.completed ? 'Planned' : 'Done'}
              </strong>

              {' by '}
              <a href={`mailto:${userData.email}`}>{userData.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
