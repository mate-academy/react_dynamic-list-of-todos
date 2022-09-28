import React, { useEffect } from 'react';
import './Loader.scss';
import { wait } from '../../api';

export const Loader: React.FC = () => {
  useEffect(() => {
    wait(500);
  });

  return (
    <div className="Loader" data-cy="loader">
      <div className="Loader__content" />
    </div>
  );
};
