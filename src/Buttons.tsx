import React from 'react';

type Props = {
  sortByCompleted: () => void;
  sortByFilter: (arg0: string) => void;
};

export const Buttons: React.FC<Props> = ({ sortByCompleted, sortByFilter }) => {
  return (
    <div className="buttons">
      <button
        className="button"
        type="button"
        onClick={() => sortByFilter('user')}
      >
        Sort by Name
      </button>
      <button
        className="button"
        type="button"
        onClick={() => sortByFilter('title')}
      >
        Sort by Title
      </button>
      <button
        className="button"
        type="button"
        onClick={sortByCompleted}
      >
        Sort by Completed
      </button>
    </div>
  );
};
