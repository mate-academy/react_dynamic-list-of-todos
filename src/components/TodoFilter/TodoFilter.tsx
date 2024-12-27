import React from 'react';
import { OptionType } from '../../types/OptionType';

type Props = {
  setOption: (option: OptionType) => void;
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setOption,
  searchInput,
  setSearchInput,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => setOption(e.currentTarget.value as OptionType)}
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
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchInput && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchInput('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
