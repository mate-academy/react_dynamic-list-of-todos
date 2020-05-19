import React from 'react';

type Props = {
  sortByTitle: () => void;
  sortByStatus: () => void;
  sortByName: () => void;
};

const TodoSort: React.FC<Props> = ({
  sortByTitle,
  sortByStatus,
  sortByName,
}) => {
  return (
    <div className="todo__sort">
      Sort by:
      <button
        type="button"
        className="todo__sort-btn"
        onClick={sortByTitle}
      >
        title
      </button>
      <button
        type="button"
        className="todo__sort-btn"
        onClick={sortByStatus}
      >
        status
      </button>
      <button
        type="button"
        className="todo__sort-btn"
        onClick={sortByName}
      >
        name
      </button>
    </div>
  );
};

export default TodoSort;
