import React from 'react';

type Props = {
  errorMessage: string;
};

export const LoadingError: React.FC<Props> = ({ errorMessage }) => (
  <div className="notification is-danger is-light">
    {errorMessage}
  </div>
);
