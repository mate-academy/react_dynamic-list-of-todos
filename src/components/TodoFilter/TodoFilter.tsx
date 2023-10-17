import React from 'react';
import { Filters } from '../../types/Filters';

interface Props {
  query: string,
  onChangeSelect: (filter: Filters) => void;
  onChangeInput: (newQuery: string) => void,
}

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangeSelect,
  onChangeInput,
}) => {
  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => onChangeSelect(event.target.value as Filters)}
          >
            <option value={Filters.ALL}>All</option>
            <option value={Filters.ACTIVE}>Active</option>
            <option value={Filters.COMPLETED}>Completed</option>
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
          onChange={(event) => {
            onChangeInput(event.target.value);
          }}
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
              onClick={() => onChangeInput('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
