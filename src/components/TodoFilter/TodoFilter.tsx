import { Values } from '../../types/Values';

type TodoFilterProps = {
  query: string;
  onQuery: (val: string) => void;
  selected: Values;
  onSelected: (val: Values) => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  query,
  onQuery,
  selected,
  onSelected,
}) => {
  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQuery(event.target.value.trimStart());
  };

  const handleSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelected(event.target.value as Values);
  };

  const handleCleanInput = () => {
    onQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selected}
            onChange={handleSelected}
          >
            <option value={Values.All}>All</option>
            <option value={Values.Active}>Active</option>
            <option value={Values.Completed}>Completed</option>
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
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleCleanInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
