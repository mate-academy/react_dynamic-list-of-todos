import React from 'react';
import './Error.scss';

type ErrorProps = {
  hasError: string;
  onModalClose: () => void;
};

export const Error: React.FC<ErrorProps> = ({ hasError, onModalClose }) => (
  <div className="Error notification is-danger is-light">
    <div className="Error-message">
      {`Error: ${hasError}`}
    </div>

    <button
      aria-label="modal-close"
      type="button"
      className="button is-danger"
      data-cy="modal-close"
      onClick={() => onModalClose()}
    >
      Ok
    </button>
  </div>
);
