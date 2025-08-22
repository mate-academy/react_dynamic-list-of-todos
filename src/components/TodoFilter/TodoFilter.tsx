type Props = {
  selectedQuery: string;
  handleSelectedQuery: (value: string) => void;
  searchQuery: string;
  handleSearchedQuery: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  selectedQuery,
  handleSelectedQuery,
  searchQuery,
  handleSearchedQuery,
}) => {
  const selectValues = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            id="statusSelect"
            data-cy="statusSelect"
            value={selectedQuery}
            onChange={event => handleSelectedQuery(event.target.value)}
          >
            {selectValues.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
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
          value={searchQuery}
          onChange={e => handleSearchedQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchQuery !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleSearchedQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
