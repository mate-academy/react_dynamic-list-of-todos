import { ChangeEvent } from 'react';

type Props = {
  statusSelect: string,
  onFilterStatus: (value: string) => void,
  searchResult: string,
  onSearchChange: (value: string) => void,
  onClearSearch: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  statusSelect,
  onFilterStatus,
  searchResult,
  onSearchChange,
  onClearSearch,
}) => {
  const handleAddFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    onFilterStatus(event.currentTarget.value);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.currentTarget.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={statusSelect}
            data-cy="statusSelect"
            onChange={event => handleAddFilter(event)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchResult}
          onChange={event => handleSearchChange(event)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {searchResult && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
