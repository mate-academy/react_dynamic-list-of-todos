import { Select } from '../../utils/Select';

type Props = {
  setFilterOption: (filterOption: Select) => void,
  setQuery: (newQuery: string) => void,
  query: string,
};

export const TodoFilter: React.FC<Props> = ({
  setFilterOption = () => { },
  setQuery = () => { },
  query,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => (
    setFilterOption(event.target.value as Select)
  );
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => (
    setQuery(event.target.value)
  );
  const handleButtonClick = () => setQuery('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectChange}
          >
            <option value={Select.All}>All</option>
            <option value={Select.Active}>Active</option>
            <option value={Select.Completed}>Completed</option>
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

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleButtonClick}
            />
          </span>
        )}
      </p>
    </form>
  );
};
