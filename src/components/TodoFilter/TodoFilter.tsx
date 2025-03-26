import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  onSelect: (status: FilterStatus) => void;
  onInput: (queryText: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({ onSelect, onInput, query }) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event => onSelect(event.target.value as FilterStatus)}
        >
          <option value={FilterStatus.All}>All</option>
          <option value={FilterStatus.Active}>Active</option>
          <option value={FilterStatus.Completed}>Completed</option>
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
        onChange={event => onInput(event.target.value)}
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
            onClick={() => onInput('')}
          />
        </span>
      )}
    </p>
  </form>
);
