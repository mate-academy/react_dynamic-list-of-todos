import React, { FC } from 'react';

interface ButtonProps {
  setSortType: (sortType: string) => void;
  title: string;
  sortType: string;
}

export const Button: FC <ButtonProps> = ({ setSortType, sortType, title }) => (
  <button
    type="button"
    className="sort-button waves-effect waves-light btn mgb20"
    onClick={() => setSortType(sortType)}
  >
    {title}
  </button>
);
