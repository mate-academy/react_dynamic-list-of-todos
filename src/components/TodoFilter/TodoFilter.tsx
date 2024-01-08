import { SelectedOption } from '../../types/SelectedOption';

type Props = {
  filter: SelectedOption;
  setFilter: (item: SelectedOption) => void;
  query: string;
  setQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  setFilter,
  query,
  setQuery,
}) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as SelectedOption);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleSelect}
          >
            <option value={SelectedOption.all}>All</option>
            <option value={SelectedOption.active}>Active</option>
            <option value={SelectedOption.completed}>Completed</option>
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="label"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
