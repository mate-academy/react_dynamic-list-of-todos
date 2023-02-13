import React from 'react';

type Props = {
  message: string,
  onRetry: () => void,
};

export const ErrorMessage: React.FC<Props> = React.memo(
  ({ message, onRetry }) => (
    <>
      <strong className="has-text-danger">
        {message}
      </strong>
      <br />
      <button
        type="button"
        className="button is-danger is-outlined"
        onClick={onRetry}
      >
        Retry
      </button>
    </>
  ),
);
