import React, { memo } from 'react';
import { Selection } from '../../types/Selection';

interface TodoFilterProps {
  query: string;
  selectionType: Selection
  setQuery: React.Dispatch<React.SetStateAction<string>>
  setSelectionType: React.Dispatch<React.SetStateAction<Selection>>;
  applyQuery: (query: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = memo(({
  selectionType,
  setSelectionType,
  query,
  setQuery,
  applyQuery,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectionType(event.target.value as Selection);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    applyQuery(value);
  };

  const handleResetQuery = () => {
    setQuery('');
  };

  return (
    <form
      className="field has-addons"
      onSubmit={handleSubmit}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectionType}
            onChange={handleSelectChange}
          >
            <option value={Selection.all}>All</option>
            <option value={Selection.active}>Active</option>
            <option value={Selection.completed}>Completed</option>
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleResetQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
});
