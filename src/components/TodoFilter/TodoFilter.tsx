type Props = {
  onSelect: React.Dispatch<React.SetStateAction<string>>;
  onInput: React.Dispatch<React.SetStateAction<string>>;
  onInputApplied: (...args: string[]) => void;
  onCancel: React.Dispatch<React.SetStateAction<string>>;
  query: string
};

export const TodoFilter: React.FC<Props> = ({
  onSelect,
  onInput,
  onInputApplied,
  onCancel,
  query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect" onChange={e => onSelect(e.target.value)}>
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
        onChange={e => {
          onInput(e.target.value);
          onInputApplied(e.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              onInput('');
              onCancel('');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
