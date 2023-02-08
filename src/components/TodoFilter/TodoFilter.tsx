import { ChangeEvent } from 'react';

type Props = {
  query: string,
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void,
  getSelectTodos: (event: ChangeEvent<HTMLSelectElement>) => void,
  onClearInput: () => void,
  isSearchActive: boolean;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  handleInput,
  getSelectTodos,
  onClearInput,
  isSearchActive,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span
          className="select"
          onChange={getSelectTodos}
        >
          <select data-cy="statusSelect">
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
          value={query}
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {isSearchActive && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClearInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
