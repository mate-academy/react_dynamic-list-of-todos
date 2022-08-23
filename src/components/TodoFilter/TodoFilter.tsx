import React from 'react';
import { FilterType } from '../../types/filterType';

type Props = {
  filterType: FilterType,
  onFilter: (type: FilterType) => void,
  inputValue: string,
  onInputChange: (val: string) => void,
  onAppliedInputChange: (val: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterType,
  onFilter,
  inputValue,
  onInputChange,
  onAppliedInputChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterType}
          onChange={(event) => {
            const { value } = event.target;

            onFilter(value as FilterType);
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
        value={inputValue}
        onChange={(event) => {
          const { value } = event.target;

          onInputChange(value);
          onAppliedInputChange(value);
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
              onInputChange('');
              onAppliedInputChange('');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
