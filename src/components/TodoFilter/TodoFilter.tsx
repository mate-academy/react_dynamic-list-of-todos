import { Status } from '../../types/Status';

type Props = {
  filterTodos: Status;
  setFilterTodos: (v: Status) => void;
  searchTodos: string;
  setSearchTodos: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterTodos,
  setFilterTodos,
  searchTodos,
  setSearchTodos,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterTodos}
          onChange={e => setFilterTodos(e.target.value as Status)}
        >
          <option value={Status.all}>All</option>
          <option value={Status.active}>Active</option>
          <option value={Status.completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={searchTodos}
        onChange={e => setSearchTodos(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {searchTodos && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setSearchTodos('')}
          />
        </span>
      )}
    </p>
  </form>
);
