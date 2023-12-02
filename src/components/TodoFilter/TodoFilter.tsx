interface Props {
  onChangeStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  inputValue: string,
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onClickReset: () => void,
}

export const TodoFilter: React.FC<Props> = ({
  onChangeStatus,
  inputValue,
  onChangeInput,
  onClickReset,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={onChangeStatus}
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
          onChange={onChangeInput}
          placeholder="Search..."
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
              onClick={onClickReset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
