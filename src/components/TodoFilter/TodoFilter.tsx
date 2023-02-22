type Props = {
  todoSelector: string;
  onChangeTodoSelector: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  todoFilter: string;
  onChangeTodoFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearTodoFilter: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  todoSelector,
  onChangeTodoSelector,
  todoFilter,
  onChangeTodoFilter,
  onClearTodoFilter,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={todoSelector}
            onChange={onChangeTodoSelector}
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
          value={todoFilter}
          onChange={onChangeTodoFilter}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {todoFilter !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClearTodoFilter}
              aria-label="Clear search"
            />
          )}
        </span>
      </p>
    </form>
  );
};
