import React from 'react';
import { ButtonProps } from '../interfaces/interfaces';

export const Button: React.FC <ButtonProps> = ({
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
