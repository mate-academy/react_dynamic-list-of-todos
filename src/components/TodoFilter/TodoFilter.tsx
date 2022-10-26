import { ChangeEvent } from 'react';

interface Props {
  category: string,
  query: string,
  onCategoryChange: (newCategory: string) => void,
  onQueryChange: (newQuery: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  category,
  query,
  onCategoryChange,
  onQueryChange,
}) => {
  const handleCategorySelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(event.target.value);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    onQueryChange(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={category}
            onChange={(event) => handleCategorySelect(event)}
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
          placeholder="Search..."
          value={query}
          onChange={(event) => handleQueryChange(event)}
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
              onClick={() => onQueryChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
