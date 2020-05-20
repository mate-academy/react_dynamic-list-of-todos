import React from 'react';
import { Todo } from '../helpers/api';

type SortProps = {
  todos: Todo[];
  setTypeOfSort: (param: string) => void;
};

const SortButtons: React.FC<SortProps> = ({
  todos, setTypeOfSort,
}) => {
  return (
    <div className="sorting-btns" hidden={todos.length === 0}>
      <button
        type="button"
        className="btn btn-success btn-sort"
        onClick={() => setTypeOfSort('title')}
      >
        Sort by Title
      </button>
      <button
        type="button"
        className="btn btn-danger btn-sort"
        onClick={() => setTypeOfSort('id')}
      >
        Sort by ID
      </button>
      <button
        type="button"
        className="btn btn-warning btn-sort"
        onClick={() => setTypeOfSort('user')}
      >
        Sort by User
      </button>
      <button
        type="button"
        className="btn btn-secondary btn-sort"
        onClick={() => setTypeOfSort('')}
      >
        RESET
      </button>
    </div>
  );
};

export default SortButtons;
