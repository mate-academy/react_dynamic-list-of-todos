import React, { memo, useState } from 'react';
import { Selection } from '../../types/Selection';

interface TodoFilterProps {
  selectionStatus: Selection
  onSelectStatus: (selection: Selection) => void;
  onApplyQuery: (query: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = memo(({
  selectionStatus,
  onSelectStatus,
  onApplyQuery,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectStatus(event.target.value as Selection);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    onApplyQuery(value);
  };

  const handleQueryReset = () => {
    setQuery('');
    onApplyQuery('');
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
            value={selectionStatus}
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
              onClick={handleQueryReset}
            />
          )}
        </span>
      </p>
    </form>
  );
});
