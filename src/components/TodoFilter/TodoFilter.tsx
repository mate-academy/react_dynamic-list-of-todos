import React, { memo } from 'react';

type Props = {
  query: string;
  filterStatus: string;
  onInputChange: (value: string) => void;
  onSelectChange: React.Dispatch<React.SetStateAction<string>>;
};

export const TodoFilter: React.FC<Props> = memo((props) => {
  const {
    query,
    filterStatus,
    onInputChange,
    onSelectChange,
  } = props;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterStatus}
            onChange={(event) => onSelectChange(event.target.value)}
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
          value={query}
          onChange={(event) => onInputChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onInputChange('')}
            />
          )}
        </span>
      </p>
    </form>
  );
});
