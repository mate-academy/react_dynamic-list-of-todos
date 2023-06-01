import React from 'react';

interface Props {
  options: string[];
  filter: string;
  onSelect: (value: string) => void
  searchValue: string;
  onChange: (value: string) => void
}

export const TodoFilter: React.FC<Props> = ({
  options,
  filter,
  onSelect,
  searchValue,
  onChange,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={filter}
            data-cy="statusSelect"
            onChange={(event) => {
              onSelect(event.target.value);
            }}
          >
            {options.map(option => (
              <option
                value={option}
                key={option}
              >
                {option}
              </option>
            ))}
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
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchValue && (
            <label>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => {
                  onChange('');
                }}
              />
            </label>
          )}
        </span>
      </p>
    </form>
  );
};
