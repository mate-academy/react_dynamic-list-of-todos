import React from 'react';
import './Loader.scss';

type Props = {
  loader: boolean;
};

export const Loader: React.FC<Props> = ({ loader }) =>
  loader ? (
    <div className="Loader" data-cy="loader">
      <div className="Loader__content" />
    </div>
  ) : null;
