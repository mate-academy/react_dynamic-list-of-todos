import React from 'react';

interface Props {
  query: string;
  status: string;
  onFilter: (value: string) => void;
  onSelectStatus: (value: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  status,
  onFilter,
  onSelectStatus,
}) => {
  const handleQueryOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onFilter(event.target.value);
  };

  const handleStatusSelectOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    onSelectStatus(event.target.value);
  };

  const handleClearButtonOnClick = () => onFilter('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusSelectOnChange}
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
          onChange={handleQueryOnChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearButtonOnClick}
            />
          )}
        </span>
      </p>
    </form>
  );
};
