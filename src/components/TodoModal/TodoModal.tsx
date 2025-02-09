import React from 'react';
import { Loader } from '../Loader';
import { ModalData } from '../../App';

type Props = {
  data: ModalData | null;
  isLoading: boolean;
  onClose: () => void;
};
export const TodoModal: React.FC<Props> = ({ data, isLoading, onClose }) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? <Loader /> : null}

      {!isLoading && data && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{data.id}
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
              {data.title}
            </p>

            <p className="block" data-cy="modal-user">
              {data.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${data.user.email}`}>{data.user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
