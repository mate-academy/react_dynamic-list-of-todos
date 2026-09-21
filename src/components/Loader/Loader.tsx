import React from 'react';
import './Loader.scss';

type Props = {
  loading: boolean;
};
export const Loader: React.FC<Props> = ({ loading }) => {
  return loading ? (
    <div className="Loader" data-cy="loader">
      <div className="Loader__content" />
    </div>
  ) : null;
};
