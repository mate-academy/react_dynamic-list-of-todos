import { memo } from 'react';
import { FilterStatus, TodoFiltersState } from '../../App';

type Props = {
  value: TodoFiltersState;
  onChangeFilter: <T extends keyof TodoFiltersState>(
    key: T,
    value: TodoFiltersState[T],
  ) => void;
};

const TodoFilterComponent = ({ value, onChangeFilter }: Props) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={value.status}
          onChange={e =>
            onChangeFilter('status', e.target.value as FilterStatus)
          }
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        value={value.search}
        onChange={e => onChangeFilter('search', e.target.value)}
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {value.search && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onChangeFilter('search', '')}
          />
        </span>
      )}
    </p>
  </form>
);

export const TodoFilter = memo(TodoFilterComponent);
