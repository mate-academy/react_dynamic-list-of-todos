import React from 'react';
import { TodoFilterOptions } from '../../services/todos';

interface Props {
  query: string;
  queryClean: () => void;
  onOption: (option: TodoFilterOptions) => void;
  queryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  queryClean,
  onOption,
  queryChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event => onOption(event.target.value as TodoFilterOptions)}
        >
          <option value={TodoFilterOptions.ALL}>All</option>
          <option value={TodoFilterOptions.ACTIVE}>Active</option>
          <option value={TodoFilterOptions.COMPLETED}>Completed</option>
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
        onChange={queryChange}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>
      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            onClick={queryClean}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      )}
    </p>
  </form>
);
