import React from 'react';

type Props = {
  filterBy: string,
  setFilterBy: (option: string) => void,
  value: string,
  setValue: (query: string) => void,
};

export const TodoFilter: React.FC<Props> = React.memo((
  {
    filterBy, setFilterBy, value, setValue,
  },
) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterBy}
          onChange={(event) => setFilterBy(event.target.value)}
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
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {value && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            aria-label="delete-button"
            onClick={() => setValue('')}
          />
        </span>
      )}
    </p>
  </form>
));
