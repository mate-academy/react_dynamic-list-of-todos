type SortFilter = {
  select: string;
  textSearch: string;
};

type Props = {
  setSortFilter: React.Dispatch<React.SetStateAction<SortFilter>>;
  sortFilter: SortFilter;
};

export const TodoFilter: React.FC<Props> = ({ setSortFilter, sortFilter }) => {




  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSortFilter(prev => ({
    ...prev,
    select: e.target.value,
  }));
  };

  const handleTextSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSortFilter(prev => ({
    ...prev,
    textSearch: e.target.value,
  }));
};


  const handleClearTextSearch = () => {
  setSortFilter(prev => ({
    ...prev,
    textSearch: '',
  }));
};


  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortFilter.select}
            onChange={handleSelectChange}
          >
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
          value={sortFilter.textSearch}
          onChange={handleTextSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {sortFilter.textSearch && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearTextSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
