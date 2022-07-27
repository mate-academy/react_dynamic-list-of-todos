/* eslint-disable no-debugger */
/* eslint-disable no-console */
type Props = {
  reset: () => void,
  query: string,
  applyQuery: (query1: string) => void,
  onHandleInputQuery: (inputQuery: string) => void,
  onHandletypeOfSelection: (selectType: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  reset,
  query,
  applyQuery,
  onHandleInputQuery,
  onHandletypeOfSelection,
}) => {
  return (
    <>
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              onChange={event => onHandletypeOfSelection(event.target.value)}
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
            onChange={event => {
              onHandleInputQuery(event.target.value);
              applyQuery(event.target.value);
            }}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {query && (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => {
                  reset();
                  onHandleInputQuery('');
                }}
              />
            )}
          </span>
        </p>
      </form>
    </>
  );
};
