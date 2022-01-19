import React from 'react';

type Props = {
  error: string,
};

export const LoadingError: React.FC<Props> = ({ error }) => (
  <div className="error">
    {error}
  </div>
);
