import { SelectValue } from '../../types/SelectValue';

type Props = {
  onSelect: (value: SelectValue) => void;
  onQueryChange: (value: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  onSelect,
  onQueryChange,
  query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event => onSelect(event.target.value as SelectValue)}
        >
          <option value={SelectValue.All}>All</option>
          <option value={SelectValue.Active}>Active</option>
          <option value={SelectValue.Completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        onChange={event => onQueryChange(event.target.value)}
        value={query}
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
            onClick={() => onQueryChange('')}
          />
        )}
      </span>
    </p>
  </form>
);
