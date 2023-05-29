import React from 'react';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  onTodoStatusSelect: (option: TodoStatus) => void,
  query: string,
  onQuery: (newQuery: string) => void,
};

export const TodoFilter: React.FC<Props> = (
  {
    onTodoStatusSelect: onTodoStatus,
    query,
    onQuery,
  },
) => {
  const handleTodoStatusCahnge = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    switch (event.target.value) {
      case 'all':
        onTodoStatus(TodoStatus.ALL);
        break;
      case 'active':
        onTodoStatus(TodoStatus.ACTIVE);
        break;
      case 'completed':
        onTodoStatus(TodoStatus.COMPLETED);
        break;
      default:
        throw new Error('Unexpected todo status');
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleTodoStatusCahnge}
          >
            <option value={TodoStatus.ALL}>All</option>
            <option value={TodoStatus.ACTIVE}>Active</option>
            <option value={TodoStatus.COMPLETED}>Completed</option>
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
          onChange={(event) => onQuery(event.target.value)}
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
              onClick={() => onQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
