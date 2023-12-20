import React from 'react';
import { SortType } from '../../types/SortType';

type Props = {
  sortBy: SortType;
  inputValue: string;
  setInputValue: (value: string) => void;
  setSortBy: (value: SortType) => void;
};

const selectOptions = [
  { value: SortType.All, title: 'All' },
  { value: SortType.Active, title: 'Active' },
  { value: SortType.Completed, title: 'Completed' },
];

export const TodoFilter: React.FC<Props> = (
  {
    sortBy,
    inputValue,
    setSortBy,
    setInputValue,
  },
) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={sortBy}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setSortBy(event.target.value as SortType);
          }}
        >
          {selectOptions.map((option) => (
            <option
              value={option.value}
            >
              {option.title}
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
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {inputValue && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              setInputValue('');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
