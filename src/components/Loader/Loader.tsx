import React from 'react';
import './Loader.scss';

// Displays a spinner while data is loading
export const Loader: React.FC = () => (
  <div className="Loader" data-cy="loader">
    <div className="Loader__content" />
  </div>
);
