import React, { FC } from 'react';

export const Button: FC <ButtonProps> = ({
  handleSort, sortType, title,
}) => (
  <button
    type="button"
    className="waves-effect waves-light btn mgb20"
    onClick={() => handleSort(sortType)}
  >
    {title}
  </button>
);
