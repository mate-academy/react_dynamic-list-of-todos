import { Filter } from '../../types/Filter';

type Props = {
  query: string;
  searchTodo: (query: string) => void;
  handleFiltered: (filterType: Filter) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  searchTodo,
  handleFiltered,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event: React.FormEvent<HTMLSelectElement>) =>
            handleFiltered(event.currentTarget.value as Filter)
          }
        >
          <option value={Filter.all}>All</option>
          <option value={Filter.active}>Active</option>
          <option value={Filter.completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        value={query}
        placeholder="Search..."
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          searchTodo(event.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {query.length > 0 && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              searchTodo('');
            }}
          />
        )}
      </span>
    </p>
  </form>
);
