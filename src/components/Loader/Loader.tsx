import React from 'react';
import './Loader.scss';
import { useTodos } from '../Context';

export const Loader: React.FC = () => {
  const { loading, loadingModal } = useTodos();

  return (
    (loading || !loadingModal) ? (
      <div className="Loader" data-cy="loader">
        <div className="Loader__content" />
      </div>
    ) : null
  );
};
