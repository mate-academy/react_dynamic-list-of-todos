import React from 'react';

type Props = {
  sortingMethod: (sort: string) => void;
};

const TodoFilter: React.FC<Props> = ({ sortingMethod }) => {
  return (
    <div className="todo__filter">
      Sort by:
      <button
        type="button"
        onClick={() => sortingMethod('title')}
      >
        Title
      </button>
      <button
        type="button"
        onClick={() => sortingMethod('completed')}
      >
        Status
      </button>
      <button
        type="button"
        onClick={() => sortingMethod('name')}
      >
        Name
      </button>
    </div>
  );
};

export default TodoFilter;
