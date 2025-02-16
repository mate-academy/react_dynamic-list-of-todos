import React, { useContext } from 'react';
import { TodoContext } from '../Todocontext/TodoContext';
import { FilterSettings } from '../Todocontext/TodoContext';

export const TodoFilter = () => {
  const { setFilterSettings, setQuery, query } = useContext(TodoContext);

  const editFilterSettings = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterSettings(event.currentTarget.value);
  };

  const editQuery = (e: React.FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const handleEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const resetQuery = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={editFilterSettings}>
            <option value={FilterSettings.all}>All</option>
            <option value={FilterSettings.active}>Active</option>
            <option value={FilterSettings.completed}>Completed</option>
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
          onChange={editQuery}
          onKeyDown={handleEnterKey}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.trim() !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
