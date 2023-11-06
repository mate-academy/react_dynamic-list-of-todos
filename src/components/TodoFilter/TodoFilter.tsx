import { Select } from '../../helpers/Select';

type Props = {
  query: string,
  onQueryChange: (value: string) => void,
  select: string
  onSelectChange: (value: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  select,
  onSelectChange,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={select}
            onChange={(event) => {
              onSelectChange(event.target.value);
            }}
          >
            <option value={Select.all}>All</option>
            <option value={Select.active}>Active</option>
            <option value={Select.completed}>Completed</option>
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
          onChange={(event) => {
            onQueryChange(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span
          className="icon is-right"
          style={{ pointerEvents: 'all' }}
        >
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              aria-label="button"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQueryChange('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
