/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { FilterParams } from '../../types/filterParams';
import { TodosContext } from '../Store/Store';

export const TodoFilter = React.memo(() => {
  const {
    title,
    setTitle,
    filter,
    setFilter,
  } = useContext(TodosContext);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterParams)}
          >
            <option value={FilterParams.All}>
              All
            </option>

            <option value={FilterParams.Active}>
              Active
            </option>

            <option value={FilterParams.Completed}>
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={title}
          onChange={handleTitle}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {title && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setTitle('')}
            />
          </span>
        )}
      </p>
    </form>
  );
});
