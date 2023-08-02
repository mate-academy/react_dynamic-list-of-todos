import { FilteredBy } from '../../types/FilterBy';

type Props = {
  handleFilteredTodos: React.Dispatch<React.SetStateAction<FilteredBy>>;
  filterBy: string;
  onInput: React.Dispatch<React.SetStateAction<string>>;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  handleFilteredTodos,
  filterBy,
  onInput,
  query,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              handleFilteredTodos(event.target.value as FilteredBy);
            }}
          >
            <option value={FilteredBy.ALL}>
              All
            </option>

            <option value={FilteredBy.ACTIVE}>
              Active
            </option>

            <option value={FilteredBy.COMPLETED}>
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          value={query}
          onChange={
            (event) => {
              onInput(event.target.value);
            }
          }
          type="text"
          className="input"
          placeholder="Search..."
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
              onClick={() => onInput('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
