import React, { FC } from 'react';

export const Button: FC <ButtonProps> = ({
  handleSort, sortType,
}) => (
  <button
    type="button"
    className="waves-effect waves-light btn mgb20"
    onClick={() => handleSort(sortType)}
  >
    Sort by title
  </button>
);
