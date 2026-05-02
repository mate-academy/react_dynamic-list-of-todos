import React from 'react';
import './Loader.scss';

interface Props {
  isLoaded: boolean;
}

export const Loader: React.FC<Props> = ({ isLoaded }) => (
  <div className="Loader" data-cy="loader" hidden={isLoaded}>
    <div className="Loader__content" />
  </div>
);
