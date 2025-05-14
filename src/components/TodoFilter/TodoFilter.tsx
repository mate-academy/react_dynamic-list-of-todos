type Props = {
  input: string;
  handleInput: (value: string) => void;
  status: string;
  handleStatus: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  input,
  handleInput,
  status,
  handleStatus,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={event => handleStatus(event.target.value)}
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
          value={input}
          className="input"
          placeholder="Search..."
          onChange={event => {
            handleInput(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {input.length > 0 ? (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleInput('')}
            />
          </span>
        ) : (
          ''
        )}
      </p>
    </form>
  );
};
