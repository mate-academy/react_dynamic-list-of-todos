import React from 'react';
import { OptionType } from '../../types/OptionType';

interface Props {
  searchQuery: string;
  onSearchQuery: (arg: string) => void;
  onSelectedOption: (arg: OptionType) => void;
}

export const TodoFilter: React.FC<Props> = ({
  searchQuery,
  onSearchQuery,
  onSelectedOption,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={
            (event) => onSelectedOption(event.target.value as OptionType)
          }
        >
          <option
            value={OptionType.ALL}
          >
            All
          </option>
          <option
            value={OptionType.ACTIVE}
          >
            Active
          </option>
          <option
            value={OptionType.COMPLETED}
          >
            Completed
          </option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={searchQuery}
        onChange={(event) => onSearchQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {searchQuery && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onSearchQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
