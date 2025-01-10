import { FilterField } from '../../types/FilterField';

type Props = {
  query: string;
  filterField: FilterField;
  setQuery: (query: string) => void;
  setFilterField: (field: FilterField) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  filterField,
  setQuery = () => { },
  setFilterField = () => { },
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterField}
          onChange={e => setFilterField(e.target.value as FilterField)}
        >
          <option value={FilterField.ALL}>All</option>
          <option value={FilterField.ACTIVE}>Active</option>
          <option value={FilterField.COMPLETED}>Completed</option>
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
        onChange={e => setQuery(e.target.value)}
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
            onClick={() => setQuery('')}
          />
        )}
      </span>
    </p>
  </form>
);
