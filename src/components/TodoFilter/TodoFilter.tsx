import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';

export enum CompletedFilter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
type TodoFilterProps = {
  search: string;
  completed: CompletedFilter;
  onSearchChange: Dispatch<SetStateAction<string>>;
  onCompletedChange: Dispatch<SetStateAction<CompletedFilter>>;
};

export const TodoFilter = ({
  search,
  completed,
  onSearchChange,
  onCompletedChange,
}: TodoFilterProps) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={completed}
          onChange={e => onCompletedChange(e.target.value as CompletedFilter)}
        >
          <option value={CompletedFilter.All}>All</option>
          <option value={CompletedFilter.Active}>Active</option>
          <option value={CompletedFilter.Completed}>Completed</option>
        </select>
      </span>
    </p>

    <p
      className={classNames('control is-expanded has-icons-left', {
        'has-icons-right': search !== '',
      })}
    >
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {search !== '' && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
