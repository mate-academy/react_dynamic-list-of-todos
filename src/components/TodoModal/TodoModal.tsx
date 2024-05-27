import React from 'react';
import { Loader } from '../Loader';

export const TodoModal: React.FC<{
  loadingModal: boolean;
  modalUser: any;
  handleClose: () => void;
}> = ({ loadingModal, modalUser, handleClose }) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleClose} />

      {loadingModal ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{modalUser.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {modalUser.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  modalUser.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {modalUser.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${modalUser.email}`}>{modalUser.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
