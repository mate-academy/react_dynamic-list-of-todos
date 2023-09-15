import { FilterTodos } from '../../types/FilterTodos';

type Props = {
  query: string;
  filterParameter: FilterTodos | string;
  onInputChange: (str: string) => void;
  onSelectChange: (field: string) => void;
};

export const TodoFilter: React.FC<Props> = (
  {
    query,
    filterParameter,
    onInputChange,
    onSelectChange,
  },
) => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value);
  };

  const handleSelect
  = (event: React.ChangeEvent<HTMLSelectElement>) => {
    return onSelectChange(event.target.value);
  };

  const clear = () => onInputChange('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterParameter}
            onChange={handleSelect}
          >
            <option value={FilterTodos.All}>All</option>
            <option value={FilterTodos.Active}>Active</option>
            <option value={FilterTodos.Completed}>Completed</option>
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

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clear}
            />
          </span>
        )}

      </p>
    </form>
  );
};
