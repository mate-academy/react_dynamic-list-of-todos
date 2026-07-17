import React from 'react';
import { ModalData } from '../../App';
import { Loader } from '../Loader';

interface Props {
  isActive: boolean;
  isLoading: boolean;
  hasError: boolean;
  modalData: ModalData;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({
  isActive,
  isLoading,
  hasError,
  modalData,
  onClose,
}) => {
  if (!isActive) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" role="presentation" onClick={onClose} />

      {isLoading && <Loader />}

      {hasError && !isLoading && (
        <p className="has-text-danger">Failed to load user</p>
      )}

      {modalData !== null && !hasError && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{modalData.todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {modalData.todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {modalData.todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${modalData.user.email}`}>
                {modalData.user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
