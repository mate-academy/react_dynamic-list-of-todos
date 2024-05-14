import { SortField } from '../../types/SortField';

type Props = {
  sortField: SortField;
  setSortField: (field: SortField) => void;
  query: string;
  setQuery: (input: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  sortField,
  setSortField,
  query,
  setQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={sortField}
          onChange={event => setSortField(event.target.value as SortField)}
        >
          <option value={SortField.ALL}>All</option>
          <option value={SortField.ACTIVE}>Active</option>
          <option value={SortField.COMPLETED}>Completed</option>
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
        onChange={event => setQuery(event.target.value)}
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
            onClick={() => setQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
