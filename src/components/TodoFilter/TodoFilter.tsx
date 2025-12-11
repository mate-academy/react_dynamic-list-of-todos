type Props = {
  input: string;
  selected: string;
  onSearch: (value: string) => void;
  onSelected: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  input,
  selected,
  onSearch,
  onSelected,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selected}
          onChange={e => onSelected(e.target.value)}
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
        value={input}
        onChange={e => onSearch(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {input.length > 0 && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label*/}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              onSearch('');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
