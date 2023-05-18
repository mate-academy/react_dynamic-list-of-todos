import React from 'react';
import { SelectValues } from '../../types/SelectValues';

type Props = {
  selectedFilterValue: string,
  setSelectedFilterValue: (value: SelectValues) => void,
  setSearchValue: (completed: string) => void,
  searchValue: string,
};

export const TodoFilter: React.FC<Props> = ({
  selectedFilterValue,
  setSelectedFilterValue,
  setSearchValue,
  searchValue,
}) => {
  const handlerChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilterValue(event.target.value as SelectValues);
  };

  const handlerChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilterValue}
            onChange={handlerChangeSelect}
          >
            {
              Object.entries(SelectValues).map(([key, value]) => (
                <option
                  key={key}
                  value={value}
                >
                  {key}
                </option>
              ))
            }
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchValue}
          onChange={handlerChangeSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchValue && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
