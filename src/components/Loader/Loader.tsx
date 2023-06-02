import React, { useEffect, useState } from 'react';
import './Loader.scss';

interface Props {
  loading: boolean;
}

export const Loader: React.FC<Props> = ({ loading }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  return (
    isLoading && (
      <>
        <div className="Loader" data-cy="loader">
          <div className="Loader__content" />
        </div>

      </>
    )
  );
};
