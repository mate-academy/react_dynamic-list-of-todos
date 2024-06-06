interface Props {
  query: string;
  OnQuery: (str: string) => void;
  onOption: (option: string) => void;
  QueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  OnQuery,
  onOption,
  QueryChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event => {
            onOption(event.target.value);
          }}
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
        value={query}
        onChange={QueryChange}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>
      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            onClick={() => {
              OnQuery('');
            }}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      )}
    </p>
  </form>
);
