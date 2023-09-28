/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Loader } from '../Loader';
import { UserInfo } from '../../types/UserInfo';

interface Props {
  userInfo: UserInfo | null;
  loaderStatus: boolean;
  closeModal: () => void;
}

export const TodoModal: React.FC<Props> = ({
  userInfo,
  loaderStatus,
  closeModal,
}) => (
  <div className="modal is-active" data-cy="modal">
    <div className="modal-background" />

    {loaderStatus ? (
      <Loader />
    ) : (
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${userInfo?.todo.id}`}
          </div>

          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={closeModal}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {userInfo?.todo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {userInfo?.todo.completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}

            {' by '}

            <a href="mailto:Sincere@april.biz">{userInfo?.name}</a>
          </p>
        </div>
      </div>
    )}
  </div>
);
