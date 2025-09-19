import React from 'react';
import './Loader.scss';

export const Loader: React.FC<{ loadingStatus: boolean }> = ({
  loadingStatus,
}) =>
  loadingStatus ? (
    <div className="Loader" data-cy="loader">
      <div className="Loader__content" />
    </div>
  ) : null;
