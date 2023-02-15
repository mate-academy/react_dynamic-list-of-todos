import React from 'react';
import { Select } from '../../types/Select';

type Props = {
  status: Select;
  query: string;
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputReset: () => void;
};

export const TodoFilter:React.FC<Props> = React.memo(({
  status,
  onSelectChange,
  query,
  onQueryChange,
  onInputReset,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={onSelectChange}
        >
          <option value={Select.ALL}>All</option>
          <option value={Select.ACTIVE}>Active</option>
          <option value={Select.COMPLETED}>Completed</option>
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
        onChange={onQueryChange}
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
            onClick={onInputReset}
          />
        </span>
      )}
    </p>
  </form>
));
