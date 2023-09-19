import { Filter } from '../../types/filter';

type Props = {
  handleSelectFilter: (filterBy: Filter) => void;
  handleTextFilter: (value: string) => void;
  textFilter: string;
};
export const TodoFilter = ({
  handleSelectFilter,
  handleTextFilter,
  textFilter,
} : Props) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(e) => handleSelectFilter(e.target.value as Filter)}
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
        value={textFilter}
        onChange={(e) => handleTextFilter(e.target.value)}
      />

      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {textFilter && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => handleTextFilter('')}
          />
        </span>
      )}
    </p>
  </form>
);
