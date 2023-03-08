import { ChangeEvent, FC } from 'react';

export enum TodoSelect {
  allTodos = 'allTodos',
  activeTodos = 'activeTodos',
  completedTodos = 'completedTodos',
}

interface Props {
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleQuery: (e: ChangeEvent<HTMLInputElement>) => void;
  clearQuery: () => void;
  query: string;
}

export const TodoFilter: FC<Props> = ({
  handleSelect, handleQuery, clearQuery, query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect" onChange={handleSelect}>
          <option value={TodoSelect.allTodos}>All</option>
          <option value={TodoSelect.activeTodos}>Active</option>
          <option value={TodoSelect.completedTodos}>Completed</option>
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
        onChange={handleQuery}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={clearQuery}
          />
        )}
      </span>
    </p>
  </form>
);
