import React from 'react';
import { SortType } from '../../types/SortType';

type Props = {
  query: string,
  changeSortType: (value: SortType) => void;
  changeQuery: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  changeSortType,
  changeQuery,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case SortType.All:
        changeSortType(SortType.All);
        break;

      case SortType.Active:
        changeSortType(SortType.Active);
        break;

      case SortType.Completed:
        changeSortType(SortType.Completed);
        break;

      default:
        break;
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectChange}
          >
            {Object.values(SortType).map(current => (
              <option value={current}>{`${current[0].toUpperCase() + current.slice(1)}`}</option>
            ))}
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
          onChange={(event) => changeQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => changeQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
