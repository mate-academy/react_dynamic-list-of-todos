import { FilterBy } from '../../types/FilterBy';

type Props = {
  value: string;
  filterText: (text: string) => void;
  filterTodo: (filter: FilterBy) => void;
};

export const TodoFilter: React.FC<Props> = ({
  value,
  filterText,
  filterTodo,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={e => filterTodo(e.target.value as FilterBy)}
        >
          <option value={FilterBy.All}>All</option>
          <option value={FilterBy.Active}>Active</option>
          <option value={FilterBy.Completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={value}
        onChange={e => filterText(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {value && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => filterText('')}
          />
        )}
      </span>
    </p>
  </form>
);
