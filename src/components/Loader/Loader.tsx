import React from 'react';
import './Loader.scss';

export const Loader: React.FC = () => (
  <progress
    className="progress is-large is-info"
    data-cy="loader"
    max="100"
  >
    40%
  </progress>
);
