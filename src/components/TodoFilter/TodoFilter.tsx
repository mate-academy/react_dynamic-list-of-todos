import { SelectFilter } from '../../types/SelectFilter';

interface Props {
  filter: string,
  inputQuery: string,
  setOnFilter: (onFilter: SelectFilter) => void,
  onInputQuery: (inputQuery: string) => void,
}

export const TodoFilter = ({
  filter,
  inputQuery,
  setOnFilter,
  onInputQuery,
}: Props) => (
  <form
    className="field has-addons"
  >
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={(event) => setOnFilter(event.target.value as SelectFilter)}
        >
          <option value={SelectFilter.ALL}>All</option>
          <option value={SelectFilter.ACTIVE}>Active</option>
          <option value={SelectFilter.COMPLETED}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={inputQuery}
        onChange={({ target }) => {
          onInputQuery(target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {inputQuery && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="submit"
            className="delete"
            onSubmit={() => {
              onInputQuery('');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
