import { Dispatch, SetStateAction } from 'react';

const STATUS_VALUE_TEXT_MAPPING = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
} as const;

export type StatusFilter = keyof typeof STATUS_VALUE_TEXT_MAPPING;

interface TodoFilterProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  status: StatusFilter;
  setStatus: Dispatch<SetStateAction<StatusFilter>>;
}

export const TodoFilter = ({
  query,
  setQuery,
  status,
  setStatus,
}: TodoFilterProps) => (
  <form className="field has-addons">
    <span className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={event => setStatus(event.target.value as StatusFilter)}
        >
          {Object.entries(STATUS_VALUE_TEXT_MAPPING).map(([value, text]) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
      </span>
    </span>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        className="input"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={event => setQuery(event.target.value.trimStart())}
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
            onClick={() => setQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
