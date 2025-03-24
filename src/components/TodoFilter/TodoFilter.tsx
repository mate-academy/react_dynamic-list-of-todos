import { FilterBy } from '../../types/FilterBy';

type Props = {
  setFilterBy: (value: FilterBy) => void;
  setQuery: (value: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  setFilterBy,
  setQuery,
  query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setFilterBy(event.target.value as FilterBy);
          }}
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
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(event.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              setQuery('');
            }}
          />
        )}
      </span>
    </p>
  </form>
);
