import { SelectFilter } from '../../types/SelectFilter';

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetQuery: () => void;
  query: string;
  selectedFilter: SelectFilter;
  onHandleSelectChange: (filter: SelectFilter) => void;
};

export const TodoFilter: React.FC<Props> = ({
  handleChange,
  resetQuery,
  query,
  selectedFilter,
  onHandleSelectChange,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onHandleSelectChange(event.target.value as SelectFilter);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={handleSelectChange}
          >
            {Object.values(SelectFilter).map(elem => (
              <option value={elem} key={elem}>
                {elem}
              </option>
            ))}
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
          onChange={handleChange}
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
              onClick={resetQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
