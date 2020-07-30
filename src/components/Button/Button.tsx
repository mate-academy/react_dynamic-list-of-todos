import React, { FC } from 'react';

interface Props {
  isLoading: boolean;
  onClick: () => void;
}

export const Button: FC<Props> = ({ isLoading, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      {isLoading ? 'Loading...' : 'Load'}
    </button>
  );
};
