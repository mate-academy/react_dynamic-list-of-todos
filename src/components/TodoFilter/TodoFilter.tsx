import React from 'react';
import { TodoCompletionFilter } from '../../types/TodoCompletionFilter';

type SetDispatch<T> =
  React.Dispatch<React.SetStateAction<T>>;

type Props = {
  todoCompletionFilterOption: TodoCompletionFilter;
  setTodoCompletionFilterOption: SetDispatch<TodoCompletionFilter>;
  searchQuery: string;
  setSearchQuery: SetDispatch<string>;
};

export const TodoFilter: React.FC<Props> = React.memo(({
  todoCompletionFilterOption,
  setTodoCompletionFilterOption,
  searchQuery,
  setSearchQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          value={todoCompletionFilterOption}
          onChange={(selectEvent) => (
            setTodoCompletionFilterOption(
              selectEvent.target.value as TodoCompletionFilter,
            )
          )}
          data-cy="statusSelect"
        >
          <option value={TodoCompletionFilter.All}>
            All
          </option>

          <option value={TodoCompletionFilter.Active}>
            Active
          </option>

          <option value={TodoCompletionFilter.Completed}>
            Completed
          </option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={searchQuery}
        onChange={(changeEvent) => (
          setSearchQuery(changeEvent.target.value)
        )}
      />

      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {searchQuery && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setSearchQuery('')}
          />
        </span>
      )}
    </p>
  </form>
));
