import React from 'react';
import { Category } from '../../types/enums/Category';

interface Props {
  query: string;
  setQuery: (query: string) => void;
  category: string;
  setCategory: (category: string) => void;
}
export const TodoFilter: React.FC<Props> = props => {
  const { query, setQuery, category, setCategory } = props;

  let isResetVisible = category !== Category.All || query !== '';

  const handleResetQueryAndCategory = () => {
    setQuery('');
    setCategory(Category.All);
    isResetVisible = false;
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={category}
            onChange={event => setCategory(event.target.value)}
          >
            <option value={Category.All}>All</option>
            <option value={Category.Active}>Active</option>
            <option value={Category.Completed}>Completed</option>
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
          onChange={event => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {isResetVisible && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleResetQueryAndCategory}
            />
          )}
        </span>
      </p>
    </form>
  );
};
