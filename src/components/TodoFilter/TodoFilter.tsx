import { FC } from 'react';
import { FilterBy } from '../../types/FilterBy';
type Props = {
  SetQuery: React.Dispatch<React.SetStateAction<string>>;
  SetFilterBy: React.Dispatch<React.SetStateAction<FilterBy>>;
  value: string;
};

export const TodoFilter: FC<Props> = ({ SetQuery, SetFilterBy, value }) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => SetFilterBy(e.target.value as FilterBy)}
          >
            <option value={FilterBy.All}>All</option>
            <option value={FilterBy.Active}>Active</option>
            <option value={FilterBy.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={value}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={e => SetQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {value && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => SetQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
