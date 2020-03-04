import React, { FC } from 'react';

import { SortOption } from '../constants/types';

interface Props {
  onClick(key: SortOption): void;
}

export const SortOptions: FC<Props> = (props) => {
  const { onClick } = props;

  return (
    <div>
      <button
        type="button"
        onClick={() => onClick('title')}
      >
        Sort by title
      </button>
      <button
        type="button"
        onClick={() => onClick('completed')}
      >
        Sort by completeness
      </button>
      <button
        type="button"
        onClick={() => onClick('name')}
      >
        Sort by name
      </button>
    </div>
  );
};
