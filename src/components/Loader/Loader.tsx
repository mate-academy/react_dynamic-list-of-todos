import React, { memo } from 'react';
import { wait } from '../../api';
import './Loader.scss';

export const Loader: React.FC = memo(() => {
  wait(300);

  return (
    <div className="Loader" data-cy="loader">
      <div className="Loader__content" />
    </div>
  );
});
