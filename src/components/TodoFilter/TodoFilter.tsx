import React from 'react';
import { Option } from '../../types/Option';

type Props = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  setSelectOption: (value: Option) => void;
};

export const TodoFilter: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  setSelectOption,
}) => {
  const handleSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectOption(event.target.value as Option);
  };

  const handleFilterBy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelected}>
            <option value={Option.All}>All</option>
            <option value={Option.Active}>Active</option>
            <option value={Option.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleFilterBy}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchQuery && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
