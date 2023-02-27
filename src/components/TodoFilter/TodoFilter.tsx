type Props = {
  inputValue: string;
  onUserInputChange: (arg: string) => void;
  onUserSelectChange: (arg: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  inputValue,
  onUserInputChange,
  onUserSelectChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => {
            onUserSelectChange(event.target.value);
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
        value={inputValue}
        onChange={(event) => {
          onUserInputChange(event.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {inputValue.length && (
        <span style={{ pointerEvents: 'all' }} className="icon is-right">
          <button
            type="button"
            onClick={() => {
              onUserInputChange('');
            }}
            data-cy="clearSearchButton"
            className="delete"
            aria-label="Save"
          />
        </span>
      )}
    </p>
  </form>
);
