export enum ForFilteredTodos {
  all = 'all',
  noCompleted = 'noCompleted',
  completed = 'completed',
}

type Props = {
  query: string;
  getSetQuery: (value: string) => void;
  selectedFilter: string;
  getSelectedFilter: (value: ForFilteredTodos) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  getSetQuery,
  selectedFilter,
  getSelectedFilter,
}) => {
  const reset = () => {
    getSetQuery('');
    getSelectedFilter(ForFilteredTodos.all);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={(event) => {
              getSelectedFilter(event.target?.value as ForFilteredTodos);
            }}
          >
            {Object.entries(ForFilteredTodos).map(([key, value]) => (
              <option value={value} key={key}>
                {value}
              </option>
            ))}
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
          onChange={(event) => getSetQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Clear Search"
              onClick={reset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
