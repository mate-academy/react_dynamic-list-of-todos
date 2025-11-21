import React from 'react';
import { useTodoContext } from '../../context/TodoContext';

export const Loader: React.FC = () => {
  const { loading } = useTodoContext();

  if (!loading) {
    return null;
  }

  return (
    <div
      className="loader-wrapper"
      data-cy="loader"
      style={{ textAlign: 'center' }}
    >
      <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem' }}></i>
    </div>
  );
};
