import { Dispatch, SetStateAction } from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  query: string,
  setQuery: (query: string) => void;
  selectedFilter: string,
  setSelectedFilter: Dispatch<SetStateAction<Filter>>
};

export const TodoFilter = (
  {
    query, setQuery, selectedFilter, setSelectedFilter,
  }: Props,
) => {
  const handleQueryChange = (text: string) => {
    setQuery(text);
  };

  const handleSelectChange = (filter: Filter) => {
    setSelectedFilter(filter);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={(event) => handleSelectChange(
              event.target.value as Filter,
            )}
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
          onChange={(event) => handleQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleQueryChange('')}
            />
          </span>
        )}

      </p>
    </form>
  );
};
