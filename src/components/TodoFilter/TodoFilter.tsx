export enum FilterTypes {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

type Props = {
  query: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  onFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  filter: 'all' | 'completed' | 'active'
};

export const TodoFilter: React.FunctionComponent<Props> = ({
  query,
  onSearch,
  onClearSearch,
  onFilter,
  filter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={onFilter}
        >
          <option value={FilterTypes.All}>All</option>
          <option value={FilterTypes.Active}>Active</option>
          <option value={FilterTypes.Completed}>Completed</option>
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
        onChange={onSearch}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          data-cy="clearSearchButton"
          type="button"
          className="delete"
          onClick={onClearSearch}
        />
      </span>
    </p>
  </form>
);
