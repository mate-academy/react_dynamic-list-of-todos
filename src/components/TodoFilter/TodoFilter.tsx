import { ChangeEvent } from 'react';
import { SortBy } from '../../types/SortBy';

type FilterTodo = {
  onSelect: (value: SortBy) => void,
  onInput: (value: string) => void,
  query: string,
  onClickClearButton: () => void,
};

export const TodoFilter: React.FC<FilterTodo> = ({
  onSelect,
  onInput,
  query,
  onClickClearButton,
}) => {
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    onInput(e.target.value);
  };

  const hadleSelectInput = (e: ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value as SortBy);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={hadleSelectInput}
            data-cy="statusSelect"
          >
            <option value={SortBy.all}>All</option>
            <option value={SortBy.active}>Active</option>
            <option value={SortBy.completed}>Completed</option>
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
          onChange={handleChangeInput}
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
              onClick={onClickClearButton}
            />
          )}
        </span>
      </p>
    </form>
  );
};
