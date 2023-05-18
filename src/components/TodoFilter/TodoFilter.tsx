import { FC } from 'react';
import { Filter } from '../../types/Filter';

interface Props {
  filterBy: Filter;
  onSelect: (filterBy: Filter) => void;
  query: string;
  onChange: (query: string) => void;
}

export const TodoFilter: FC<Props> = ({
  filterBy,
  onSelect,
  query,
  onChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterBy}
          onChange={(event) => onSelect(event.target.value as Filter)}
        >
          <option value={Filter.All}>{Filter.All}</option>
          <option value={Filter.Active}>{Filter.Active}</option>
          <option value={Filter.Completed}>{Filter.Completed}</option>
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
        onChange={(event) => onChange(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onChange('')}
          />
        )}
      </span>
    </p>
  </form>
);
