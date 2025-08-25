type Props = {
  searchByState: 'all' | 'active' | 'completed';
  searchByTitle: string;
  setSearchByState: (param: 'all' | 'active' | 'completed') => void;
  setSearchByTitle: (param: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  searchByState,
  searchByTitle,
  setSearchByState,
  setSearchByTitle,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={searchByState}
          onChange={e =>
            setSearchByState(e.target.value as 'all' | 'active' | 'completed')
          }
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
        value={searchByTitle}
        onChange={e => setSearchByTitle(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {searchByTitle && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setSearchByTitle('')}
          />
        )}
      </span>
    </p>
  </form>
);
