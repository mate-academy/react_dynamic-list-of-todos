import { Filters } from '../../utils/todos';

type Props = {
  handleChangeFilter: (val: Filters) => void;
  filter: Filters;
  onChange: (val: string) => void;
  searchText: string;
};

export const TodoFilter: React.FC<Props> = ({
  handleChangeFilter,
  filter,
  onChange,
  searchText,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={e =>
            handleChangeFilter(e.target.value as unknown as Filters)
          }
          value={filter}
        >
          <option value={Filters.All}>All</option>
          <option value={Filters.Active}>Active</option>
          <option value={Filters.Completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={searchText}
        onChange={e => onChange(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {searchText && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onChange('')}
          />
        </span>
      )}
    </p>
  </form>
);
