import classNames from 'classnames';

interface Props {
  inputValue: string;
  onInputChange: (value: string) => void;
  selectValue: string;
  onStatusChange: (value: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  inputValue,
  onInputChange,
  selectValue,
  onStatusChange,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => {
              onStatusChange(event.target.value);
            }}
            value={selectValue}
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
          onChange={event => {
            onInputChange(event.target.value);
          }}
          value={inputValue}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputValue.length > 0 && (
          <span className={classNames('icon', 'is-right')}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onInputChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
