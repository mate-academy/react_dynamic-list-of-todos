import { FC } from 'react';
import { Select } from '../../types/Select';

type Props = {
  query: string,
  selectedFilter: Select,
  handleSelectFilter: (status: Select) => void,
  handleSetQuery: (value: string) => void,
};

export const TodoFilter: FC<Props> = ({
  query,
  selectedFilter,
  handleSelectFilter,
  handleSetQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selectedFilter}
          onChange={event => handleSelectFilter(event.target.value as Select)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        onChange={event => handleSetQuery(event.target.value)}
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={query}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right">
          <button
            onClick={() => handleSetQuery('')}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            aria-label="delete"
          />
        </span>
      )}
    </p>
  </form>
);
