import { Filter } from '../../types/Filters';

type Props = {
  searchInputValue: string;
  setSearchInput: (value: string) => void;
  setVisibleTodos: (value: Filter) => void;
};

export const TodoFilter = ({
  setVisibleTodos,
  searchInputValue,
  setSearchInput,
}: Props) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={event => setVisibleTodos(event.target.value as Filter)}
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={searchInputValue}
          onChange={event => setSearchInput(event.target.value)}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchInputValue.length > 0 && (
            <button
              onClick={() => setSearchInput('')}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
