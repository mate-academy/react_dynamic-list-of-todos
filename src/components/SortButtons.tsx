import React from 'react';
import { Todo } from '../helpers/api';

type SortProps = {
  todos: Todo[];
  sortByTitle: () => void;
  sortById: () => void;
  sortByUser: () => void;
  makeDefaultOrder: () => void;
};

const SortButtons: React.FC<SortProps> = ({
  todos, sortById, sortByTitle, sortByUser, makeDefaultOrder,
}) => {
  return (
    <div className="sorting-btns" hidden={todos.length === 0}>
      <button
        type="button"
        className="btn btn-success btn-sort"
        onClick={sortByTitle}
      >
        Sort by Title
      </button>
      <button
        type="button"
        className="btn btn-danger btn-sort"
        onClick={sortById}
      >
        Sort by ID
      </button>
      <button
        type="button"
        className="btn btn-warning btn-sort"
        onClick={sortByUser}
      >
        Sort by User
      </button>
      <button
        type="button"
        className="btn btn-secondary btn-sort"
        onClick={makeDefaultOrder}
      >
        RESET
      </button>
    </div>
  );
};

export default SortButtons;
