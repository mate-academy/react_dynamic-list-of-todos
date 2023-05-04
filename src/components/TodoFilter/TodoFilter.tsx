import React, { ChangeEvent } from 'react';
import { SelectValue } from '../../types/SelectValues';

type Props = {
  selectedValue: SelectValue,
  searchQuery: string,
  onChangeSelect: (event: ChangeEvent<HTMLSelectElement>) => void,
  onChangeQuery: (event: ChangeEvent<HTMLInputElement>) => void,
  clearSearch: () => void,
};

export const TodoFilter: React.FC<Props> = (
  {
    selectedValue,
    searchQuery,
    onChangeSelect,
    onChangeQuery,
    clearSearch,
  },
) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={onChangeSelect}
          value={selectedValue}
        >
          {Object.entries(SelectValue).map(([key, value]) => (
            <option
              key={value}
              value={value}
            >
              {key}
            </option>
          ))}
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        name="search"
        className="input"
        placeholder="Search..."
        value={searchQuery}
        onChange={onChangeQuery}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {searchQuery && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            name="clearButton"
            type="button"
            className="delete"
            onClick={clearSearch}
          />
        )}
      </span>
    </p>
  </form>
);
