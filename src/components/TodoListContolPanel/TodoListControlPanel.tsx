import React from 'react';

import './TodoListControlPanel.scss';

type Props = {
  filterTitle: string;
  setFilterTitle: React.Dispatch<React.SetStateAction<string>>;
  filterComplete: string;
  setFilterComplete: React.Dispatch<React.SetStateAction<string>>;
  randomizeTodos: () => void;
};

export const TodoListControlPanel: React.FC<Props> = ({
  filterTitle,
  setFilterTitle,
  filterComplete,
  setFilterComplete,
  randomizeTodos,
}) => (
  <div className="TodoList__controlPanel controlPanel">
    <label
      className="controlPanel__titleFilter"
    >
      Filter:
      <input
        type="text"
        value={filterTitle}
        onChange={({ target }) => {
          setFilterTitle(target.value);
        }}
        className="controlPanel__titleFilterInput"
      />
    </label>

    <label
      className="controlPanel__comletedFilter"
    >
      Show:
      <select
        name="visibleGoods"
        value={filterComplete}
        onChange={({ target }) => {
          setFilterComplete(target.value);
        }}
        className="controlPanel__comletedFilterSelect"
      >
        <option value="all">
          All
        </option>

        <option value="active">
          Active
        </option>

        <option value="completed">
          Completed
        </option>
      </select>
    </label>

    <button
      type="button"
      onClick={randomizeTodos}
      className="button"
    >
      Randomize list
    </button>
  </div>
);
