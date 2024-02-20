import React from 'react';
import './Loader.scss';

export const Loader: React.FC = () => {
  return (
    <div data-cy="loader">
      <div className="Loader__content" />
    </div>
  );
};
