/* eslint-disable jsx-a11y/control-has-associated-label */
import { Filter } from '../../types/enums';

type Props = {
  filter: Filter
  onSelect: (value: Filter) => void,
};

export const TodoFilter: React.FC<Props> = ({ filter, onSelect }) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          value={filter}
          data-cy="statusSelect"
          onChange={(event) => onSelect(event.target.value as Filter)}
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
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        <button
          data-cy="clearSearchButton"
          type="button"
          className="delete"
        />
      </span>
    </p>
  </form>
);
