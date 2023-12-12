type Props = {
  inputValue: string,
  onUserInput: (arg: string) => void,
  onUserSelect: (arg: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  inputValue,
  onUserInput,
  onUserSelect,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => {
            onUserSelect(event.target.value);
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
        value={inputValue}
        placeholder="Search..."
        onChange={(event) => {
          onUserInput(event.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>
      {inputValue.length > 0 && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              onUserInput('');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
