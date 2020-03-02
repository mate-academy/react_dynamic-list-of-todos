import React from 'react';

interface Props {
  onClick(key: SortOption): void;
}

export const SortOptions = (props: Props): JSX.Element => {
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
