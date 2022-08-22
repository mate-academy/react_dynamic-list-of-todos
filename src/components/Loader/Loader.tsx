import React from 'react';
import './Loader.scss';

type Props = {
  isLoadEnd: boolean,
};

export const Loader: React.FC<Props> = ({ isLoadEnd }) => {
  if (!isLoadEnd) {
    return (
      <div className="Loader" data-cy="loader">
        <div className="Loader__content" />
      </div>
    );
  }

  return <></>;
};
