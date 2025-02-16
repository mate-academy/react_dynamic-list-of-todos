import { FC } from 'react';
import { completionOptions } from '../../mocks';
import { CompletionQuery } from '../../types/CompletionQuery';

type Props = {
  searchQuery: string;
  completionQuery: string;
  onAddSearchQuery: (query: string) => void;
  onAddCompletionQuery: (query: CompletionQuery) => void;
};

export const TodoFilter: FC<Props> = ({
  searchQuery,
  completionQuery,
  onAddSearchQuery,
  onAddCompletionQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={completionQuery}
          onChange={event =>
            onAddCompletionQuery(event.target.value as CompletionQuery)
          }
        >
          {completionOptions.map(query => (
            <option key={query.name} value={query.value}>
              {query.name}
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
        value={searchQuery}
        onChange={event => onAddSearchQuery(event.target.value)}
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
            onClick={() => onAddSearchQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
