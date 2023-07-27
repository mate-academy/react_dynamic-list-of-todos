/* eslint-disable jsx-a11y/control-has-associated-label */

type Props = {
  query: string,
  onChangeQuery: (value: string) => void,
  state: string,
  onChangeState: (value: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangeQuery: onQueryChange,
  state,
  onChangeState: onStateChange,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => {
              onStateChange(event.target.value);
            }}
            defaultValue={state}
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
            onQueryChange(event.target.value);
          }}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>

            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQueryChange('')}
            />
          </span>
        )}

      </p>
    </form>
  );
};
