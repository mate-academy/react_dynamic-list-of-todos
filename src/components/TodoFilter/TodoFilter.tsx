import { useState } from 'react';

interface TodoFilterProps {
  onFilterChange: (filter: string) => void;
  onSearchChange: (search: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  onFilterChange,
  onSearchChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('all');
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedValue}
            onChange={event => {
              const value = event.target.value;

              setSelectedValue(value);
              onFilterChange(value);
            }}
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
          value={searchValue}
          onChange={event => {
            const value = event.target.value;

            setSearchValue(value);
            onSearchChange(value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchValue && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setSearchValue('');
                onSearchChange('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
