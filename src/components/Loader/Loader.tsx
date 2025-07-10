import React from 'react';
import './Loader.scss';

type Props = {
  dataCy?: string;
};

export const Loader: React.FC<Props> = ({ dataCy }) => (
  <div className="loader-container" data-cy={dataCy}>
    <div className="loader" />
  </div>
);
