import { FC, memo } from 'react';
import { FilterOptions } from '../../types/FilterOptions';

interface Props {
  query: string,
  onQueryChange: React.Dispatch<React.SetStateAction<string>>,
  selectedTodos: string,
  onSelectedTodosChange: React.Dispatch<React.SetStateAction<string>>,
}

export const TodoFilter: FC<Props> = memo(({
  query,
  onQueryChange,
  selectedTodos,
  onSelectedTodosChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selectedTodos}
          onChange={(event) => (
            onSelectedTodosChange(event.target.value))}
        >
          <option value={FilterOptions.all}>All</option>
          <option value={FilterOptions.active}>Active</option>
          <option value={FilterOptions.completed}>Completed</option>
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
        onChange={(event => {
          onQueryChange(event.target.value);
        })}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      { /* eslint-disable jsx-a11y/control-has-associated-label */}
      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query.length > 0 && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onQueryChange('')}
          />
        )}
      </span>
    </p>
  </form>
));
