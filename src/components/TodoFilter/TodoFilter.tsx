import { FC, Dispatch, SetStateAction } from 'react';
import { TodoStatusFilter } from '../../types/TodoStatusFilter';

type TodoFilterProps = {
  status: TodoStatusFilter;
  onStatusChange: Dispatch<SetStateAction<TodoStatusFilter>>;
  search: string;
  onSearchChange: Dispatch<SetStateAction<string>>;
};

const TodoStatusFilterText: Record<TodoStatusFilter, string> = {
  [TodoStatusFilter.All]: 'All',
  [TodoStatusFilter.Active]: 'Active',
  [TodoStatusFilter.Completed]: 'Completed',
};

export const TodoFilter: FC<TodoFilterProps> = ({
  status,
  search,
  onSearchChange,
  onStatusChange,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => onStatusChange(e.target.value as TodoStatusFilter)}
          >
            {Object.entries(TodoStatusFilter).map(([key, value]) => (
              <option key={key} value={value}>
                {TodoStatusFilterText[value]}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={search}
          onChange={e => onSearchChange(e.target.value.trimStart())}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {search && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onSearchChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
