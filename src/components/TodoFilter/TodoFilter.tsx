interface Props {
  onSortConditionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  sortCondition: string;
}

export const TodoFilter: React.FC<Props> = ({
  onSortConditionChange,
  sortCondition,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={sortCondition}
          onChange={onSortConditionChange}
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
        />
      </span>
    </p>
  </form>
);
