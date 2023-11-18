import React, { useRef } from 'react';
import { FilterOption } from '../../enums/FilterOption';
import { Filter } from '../../types/Filter';

type Props = {
  filter: Filter;
};

export const TodoFilter: React.FC<Props> = ({ filter }) => {
  const filterInput = useRef<HTMLInputElement>(null);

  const filterOptionChangeHandler
    = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newFilterOption = event.target.value;

      switch (newFilterOption) {
        case 'active':
          filter.save(filter.filterText, FilterOption.ACTIVE);
          break;
        case 'completed':
          filter.save(filter.filterText, FilterOption.COMPLETED);
          break;
        default:
          filter.save(filter.filterText, FilterOption.ALL);
      }
    };

  const filterTextChangeHandler
    = (event: React.FormEvent<HTMLInputElement>) => {
      filter.save(event.currentTarget.value, filter.filterOption);
    };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.filterOption}
            onChange={filterOptionChangeHandler}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          ref={filterInput}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onInput={filterTextChangeHandler}
          value={filter.filterText}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.filterText && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => filter.save('', filter.filterOption)}
            />
          </span>
        )}
      </p>
    </form>
  );
};
