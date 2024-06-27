import React from 'react';
import { FilterStatus } from '../../types/filter';

type Props = {
  changeStatusOfTodos: (value: FilterStatus) => void;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearSearchBtn: () => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  changeStatusOfTodos,
  handleQueryChange,
  handleClearSearchBtn,
  query,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeStatusOfTodos(event.target.value as FilterStatus);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleChange}>
            <option value={FilterStatus.All}>All</option>
            <option value={FilterStatus.Active}>Active</option>
            <option value={FilterStatus.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          value={query}
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              onClick={handleClearSearchBtn}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
