import React from 'react';

type Props = {
  setSortingMethod: (sort: string) => void;
};

const TodoFilter: React.FC<Props> = ({ setSortingMethod }) => {
  return (
    <div className="todo__filter">
      Sort by:
      <button
        type="button"
        onClick={() => setSortingMethod('title')}
      >
        Title
      </button>
      <button
        type="button"
        onClick={() => setSortingMethod('completed')}
      >
        Status
      </button>
      <button
        type="button"
        onClick={() => setSortingMethod('name')}
      >
        Name
      </button>
    </div>
  );
};

export default TodoFilter;
