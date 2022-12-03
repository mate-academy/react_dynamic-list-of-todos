import { SelectedTodosType } from '../../types/SelectedTodosType';

type Props = {
  query: string,
  setQuery: (value: string) => void,
  selectedTodosType: SelectedTodosType,
  handelSelectedTodosType: (value: SelectedTodosType) => void,
};

export const TodoFilter: React.FC<Props> = (props) => {
  const {
    query,
    setQuery,
    selectedTodosType,
    handelSelectedTodosType,
  } = props;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedTodosType}
            onChange={(event) => {
              handelSelectedTodosType(event.target.value as SelectedTodosType);
            }}
          >
            <option value={SelectedTodosType.All}>All</option>
            <option value={SelectedTodosType.Active}>Active</option>
            <option value={SelectedTodosType.Completed}>Completed</option>
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
          onChange={(event) => setQuery(event.target.value)}
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
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
