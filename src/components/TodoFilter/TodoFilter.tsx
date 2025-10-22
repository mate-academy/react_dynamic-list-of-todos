import React from 'react';
import { FilterTypes } from '../../types/Todo';

type Props = {
  handleSelectFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  filterStatus: FilterTypes;
  textInput: string;
  handleTextInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFilter: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  handleSelectFilter,
  filterStatus,
  textInput,
  handleTextInput,
  handleRemoveFilter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterStatus}
          onChange={handleSelectFilter}
        >
          <option value={FilterTypes.All}>All</option>
          <option value={FilterTypes.Active}>Active</option>
          <option value={FilterTypes.Completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={textInput}
        onChange={handleTextInput}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {textInput !== '' && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => handleRemoveFilter()}
          />
        )}
      </span>
    </p>
  </form>
);
