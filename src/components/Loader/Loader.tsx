import React from 'react';
import './Loader.scss';

export const LoaderBase: React.FC = () => (
  <div className="Loader" data-cy="loader">
    <div className="Loader__content" />
  </div>
);

export const Loader = React.memo(LoaderBase);
