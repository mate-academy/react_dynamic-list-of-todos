import React from 'react';

type Props = {
  selectStatus: string,
  onSelectStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  onQueryChange: (value:string) => void,
  query: string,
};

export const TodoFilter: React.FC<Props> = (props) => {
  const {
    selectStatus,
    onSelectStatus,
    onQueryChange,
    query,
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  const reset = () => {
    onQueryChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectStatus}
            onChange={onSelectStatus}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed </option>
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
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <i
              aria-label="text"
              role="button"
              tabIndex={0}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={reset}
              onKeyDown={reset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
