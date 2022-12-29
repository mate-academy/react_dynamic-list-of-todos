import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  onSelect: (value: string) => void,
  onSearch: (value: string) => void,
  selectionOption: string,
  searchTodo: string,
};

export const TodoFilter: React.FC<Props> = ({
  onSelect,
  onSearch,
  selectionOption,
  searchTodo,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  const handleSearchTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const handleClearInput = () => {
    onSearch('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectionOption}
            onChange={handleChange}
          >
            <option value={Filter.All}>All</option>
            <option value={Filter.Active}>Active</option>
            <option value={Filter.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchTodo}
          onChange={handleSearchTodo}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchTodo && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
