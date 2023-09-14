import React from 'react';
import { Filter, FilterEnum } from '../../types/Filter';

type Props = {
  filter: Filter;
  onFilter: (f: Filter) => void;
};

export const TodoFilter: React.FC<Props> = ({ filter, onFilter }) => {
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilter({
      ...filter,
      select: event.target.value as FilterEnum,
    });
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilter({
      ...filter,
      input: event.target.value,
    });
  };

  const handleClickCross = () => {
    onFilter({
      ...filter,
      input: '',
    });
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.select}
            onChange={handleChangeSelect}
          >
            {Object.values(FilterEnum).map(value => (
              <option value={value} key={value}>
                {value.at(0)?.toUpperCase() + value.slice(1)}
              </option>
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
          value={filter.input}
          onChange={handleChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!filter.input && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              aria-label="deleteButton"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClickCross}
            />
          </span>
        )}

      </p>
    </form>
  );
};
