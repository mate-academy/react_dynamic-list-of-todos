import { Filter } from '../../types/Filter';

type Props = {
  changeFilter: (filter: Filter) => void;
  searchQuery: string;
  changeSearchQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  changeFilter,
  searchQuery,
  changeSearchQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={e => changeFilter(e.target.value as Filter)}
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
        value={searchQuery}
        onChange={e => changeSearchQuery(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {searchQuery && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => changeSearchQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
