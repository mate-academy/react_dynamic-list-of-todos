type Props = {
  selected: string;
  searchString: string;
  setSelected: (filter: string) => void;
  setSearchString: (search: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  selected,
  searchString,
  setSelected,
  setSearchString,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selected}
          onChange={e => setSelected(e.target.value)}
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
        value={searchString}
        onChange={e => setSearchString(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}

        {searchString && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setSearchString('')}
          />
        )}
      </span>
    </p>
  </form>
);
