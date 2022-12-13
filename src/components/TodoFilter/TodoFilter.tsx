import React from 'react';
import { SortType } from '../../types/SortType';

type Props = {
  sortType: SortType,
  onSelectSortType: (sortType: SortType) => void;
  query: string;
  onChangeQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = React.memo(
  (props) => {
    const {
      sortType,
      onSelectSortType,
      query,
      onChangeQuery,
    } = props;

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={sortType}
              onChange={
                event => onSelectSortType(event.target.value as SortType)
              }
            >
              <option value={SortType.all}>All</option>
              <option value={SortType.active}>Active</option>
              <option value={SortType.completed}>Completed</option>
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
            onChange={event => onChangeQuery(event.target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          {!query.length || (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => onChangeQuery('')}
              />
            </span>
          )}
        </p>
      </form>
    );
  },
);
