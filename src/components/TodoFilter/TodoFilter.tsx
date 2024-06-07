import { PropsFilter } from '../../types/TodoList';

export const TodoFilter: React.FC<PropsFilter> = ({
  filterPosts,
  textFilter,
  isHaveText,
  clearButton,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect" onChange={filterPosts}>
          <option value={'all'}>All</option>
          <option value={'active'}>Active</option>
          <option value={'completed'}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={isHaveText}
        onChange={textFilter}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {isHaveText && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={clearButton}
          />
        )}
      </span>
    </p>
  </form>
);
