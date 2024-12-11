import React from 'react';
import { FilterRules } from '../../types/FilterField';

type Props = {
  query: string;
  rule: FilterRules;
  setQuery: (query: string) => void;
  chooseRule: (rule: FilterRules) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  rule,
  setQuery,
  chooseRule,
}) => {
  const reset = () => {
    chooseRule(FilterRules.ALL);
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={rule}
            onChange={event => chooseRule(event.target.value as FilterRules)}
          >
            <option value={FilterRules.ALL}>All</option>
            <option value={FilterRules.ACTIVE}>Active</option>
            <option value={FilterRules.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right pointerEvents">
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={reset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
