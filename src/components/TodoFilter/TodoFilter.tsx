import { Filter } from '../../helpers/constants';

type Props = {
  setFilter: (value: string) => void,
  filter: string,
  setSearch: (value: string) => void,
  searchQuery: string,
};

export const TodoFilter: React.FC<Props> = ({
  setFilter,
  filter,
  setSearch,
  searchQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value={Filter.all}>
              All
            </option>
            <option value={Filter.active}>
              Active
            </option>
            <option value={Filter.completed}>
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearch('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
