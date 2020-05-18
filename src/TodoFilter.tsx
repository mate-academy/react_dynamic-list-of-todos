import React from 'react';

type Props = {
  sortTitles: () => void;
  sortComplete: () => void;
  sortNames: () => void;
};

const TodoFilter: React.FC<Props> = ({ sortTitles, sortComplete, sortNames }) => {
  return (
    <div className="todo__filter">
      Sort by:
      <button
        type="button"
        onClick={sortTitles}
      >
        Title
      </button>
      <button
        type="button"
        onClick={sortComplete}
      >
        Status
      </button>
      <button
        type="button"
        onClick={sortNames}
      >
        Name
      </button>
    </div>
  );
};

export default TodoFilter;
