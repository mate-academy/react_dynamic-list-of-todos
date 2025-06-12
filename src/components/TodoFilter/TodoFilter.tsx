import { Dispatch, SetStateAction } from 'react';

const STATUS_VALUE_TEXT_MAPPING = {
  all: 'ALL',
  active: 'ACTIVE',
  completed: 'COMPLETED',
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
    <p className="control">
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
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
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
