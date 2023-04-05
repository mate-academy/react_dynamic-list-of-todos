import React from 'react';
import { TodoCompletionFilter } from '../../types/TodoCompletionFilter';

type TodoCompletionFilterDispatch =
  React.Dispatch<React.SetStateAction<TodoCompletionFilter>>;

type SearchQueryDispatch =
  React.Dispatch<React.SetStateAction<string>>;

type Props = {
  todoCompletionFilterOption: TodoCompletionFilter;
  setTodoCompletionFilterOption: TodoCompletionFilterDispatch;
  searchQuery: string;
  setSearchQuery: SearchQueryDispatch;
};

export const TodoFilter: React.FC<Props> = ({
  todoCompletionFilterOption,
  setTodoCompletionFilterOption,
  searchQuery,
  setSearchQuery,
}) => {
  // console.log('render Filter');

  return (
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
              {TodoCompletionFilter.All}
            </option>
            <option value={TodoCompletionFilter.Active}>
              {TodoCompletionFilter.Active}
            </option>
            <option value={TodoCompletionFilter.Completed}>
              {TodoCompletionFilter.Completed}
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

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setSearchQuery('')}
          />
        </span>
      </p>
    </form>
  );
};
