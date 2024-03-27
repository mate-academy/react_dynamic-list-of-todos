import React from 'react';
import { FilterConfig } from '../../types/FilterConfig';

type Props = {
  filterConfig: FilterConfig;
  setFilterConfig: React.Dispatch<React.SetStateAction<FilterConfig>>;
};

export const TodoFilter: React.FC<Props> = ({
  filterConfig,
  setFilterConfig,
}) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value, name } = event.target;

    setFilterConfig(prevFilterConfig => ({
      ...prevFilterConfig,
      [name]: value,
    }));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            name="filterOption"
            data-cy="statusSelect"
            value={filterConfig.filterOption}
            onChange={handleChange}
          >
            <option value={'all'}>All</option>
            <option value={'active'}>Active</option>
            <option value={'completed'}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          name="query"
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filterConfig.query}
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {Boolean(filterConfig.query) && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() =>
                setFilterConfig(prevConfig => ({ ...prevConfig, query: '' }))
              }
            />
          )}
        </span>
      </p>
    </form>
  );
};
