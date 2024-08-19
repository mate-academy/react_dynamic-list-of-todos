import React, { FC } from 'react';

type Props = {
  query: string;
  onSetFilterName: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onSetSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearInput: () => void;
};

export const TodoFilter: FC<Props> = ({
  query,
  onSetFilterName,
  onSetSearch,
  clearInput,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={onSetFilterName}>
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
          onChange={onSetSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
