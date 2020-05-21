import React from 'react';

interface ClickHandler {
  (): void;
}

type Props = {
  reset: ClickHandler;
  sortByTitle: ClickHandler;
  sortByCompleted: ClickHandler;
  sortByUserName: ClickHandler;
};

export const SortButtons: React.FC<Props> = ({
  reset,
  sortByTitle,
  sortByCompleted,
  sortByUserName,
}) => (
  <p>
    <button
      className="button button-sort"
      onClick={reset}
      type="button"
    >
      Reset
    </button>
    <button
      className="button button-sort"
      onClick={sortByTitle}
      type="button"
    >
      Sort by title
    </button>
    <button
      className="button button-sort"
      onClick={sortByCompleted}
      type="button"
    >
      Sort by completed
    </button>
    <button
      className="button button-sort"
      onClick={sortByUserName}
      type="button"
    >
      Sort by user name
    </button>

  </p>
);
