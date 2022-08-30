import { FC } from 'react';

interface Props {
  query: string;
  onSearch: (query: string) => void;
  onFilter: (option: string) => void;
  filterVariant: string
}

export const TodoFilter: FC<Props> = (props) => {
  const {
    query,
    onSearch,
    onFilter,
    filterVariant,
  } = props;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => onFilter(event.target.value)}
            value={filterVariant}
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
          value={query}
          onChange={event => onSearch(event.target.value)}
          placeholder="Search..."
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
              onClick={() => onSearch('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
