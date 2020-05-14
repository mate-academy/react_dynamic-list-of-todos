import React from 'react';

type Props = {
  sortListByTitle: () => void;
  sortListByStatus: () => void;
  sortListByName: () => void;
};

const TodoSort: React.FC<Props> = ({ sortListByTitle, sortListByStatus, sortListByName }) => {
  return (
    <div className="todo__sort">
      Sort by:
      <button
        type="button"
        onClick={sortListByTitle}
      >
        title
      </button>
      <button
        type="button"
        onClick={sortListByStatus}
      >
        status
      </button>
      <button
        type="button"
        onClick={sortListByName}
      >
        name
      </button>
    </div>
  );
};

export default TodoSort;
