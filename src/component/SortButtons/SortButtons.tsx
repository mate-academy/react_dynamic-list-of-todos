import React from 'react';


const wordsForSorting = ['title', 'status', 'name'];

type Props = {
  onSort: (sortBy: string) => void;
};

export const SortButtons: React.FC<Props> = (props: Props) => {
  const { onSort } = props;

  return (
    <>
      <span>Sort by:</span>
      {wordsForSorting.map((value) => {
        return (
          <button key={value} type="button" onClick={() => onSort(value)}>
            {value}
          </button>
        );
      })}
    </>
  );
};
