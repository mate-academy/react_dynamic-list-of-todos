import {
  ChangeEvent, useContext,
} from 'react';
import { StateOption, TodoContext } from '../../TodoContext';

export const TodoFilter = () => {
  const {
    query,
    setQuery,
    filterOption,
    setFilterOption,
  } = useContext(TodoContext);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case (StateOption.active):
        setFilterOption(StateOption.active);
        break;
      case (StateOption.completed):
        setFilterOption(StateOption.completed);
        break;
      default:
        setFilterOption(StateOption.all);
        break;
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectChange}
            value={filterOption}
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
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
};
