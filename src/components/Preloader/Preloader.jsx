import React from 'react';
import Loader from '../../assets/Spinner-3.gif';

export const Preloader = ({ children = null, isLoading }) => {
  if (isLoading) {
    return (
      <div className="preloader">
        <img src={Loader} alt="loading..." />
      </div>
    );
  }

  return children;
};
