import { FC } from 'react';

interface Filter {
  filteredBy: string;
  query: string;
}

type Props = {
  filter: Filter;
  setFilter: (par: Filter) => void;
};

export const TodoFilter: FC<Props> = ({ filter, setFilter }) => {
  const { query } = filter;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={filter.filteredBy}
            data-cy="statusSelect"
            onChange={(e) => setFilter({
              ...filter, filteredBy: e.target.value,
            })}
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
          value={filter.query}
          onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => setFilter({ ...filter, query: '' })}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
