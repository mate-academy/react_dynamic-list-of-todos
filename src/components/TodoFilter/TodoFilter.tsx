type Props = {
  selected: string;
  setSelected: (selected: string) => void;
  search: string;
  setSearch: (search: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  selected,
  search,
  setSelected,
  setSearch,
}) => {
  const HandleSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  const HandleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.toLowerCase());
  };

  return (
    <form className="field has-addons" defaultValue="">
      <p className="control">
        <span className="select">
          <select
            value={selected}
            onChange={HandleSelected}
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            {selected}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={search}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={HandleSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {search && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearch('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
