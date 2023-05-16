import React from 'react';
import { FilterBy } from '../../types/FilterBy';

type Props = {
  query: string;
  onChange: (query: string) => void;
  selectValue: FilterBy;
  onSelect: (sort: FilterBy) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChange,
  selectValue,
  onSelect,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selectValue}
          onChange={(event) => {
            switch (event.target.value) {
              case 'all':
                return onSelect(FilterBy.ALL);
              case 'completed':
                return onSelect(FilterBy.COMPLETED);
              case 'active':
                return onSelect(FilterBy.ACTIVE);
              default:
                return onSelect(FilterBy.ALL);
            }
          }}
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
        value={query}
        onChange={(event) => onChange(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {
          query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onChange('')}
            />
          )
        }
      </span>
    </p>
  </form>
);
